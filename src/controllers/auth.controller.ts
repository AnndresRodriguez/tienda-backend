import { Request, Response } from "express";
import User, {IUser} from "../models/user";
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response) => {

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({
        "Item": "Not found User"
    })

    const passwordValid: boolean = await user.validatePassword(req.body.password);
    if(!passwordValid) return res.status(400).json({"error": "pass Incorrect"})

    const token : string = jwt.sign({id: user._id}, process.env.SECRET_TOKEN || "ALTERANTIVE TOKEN", {
        expiresIn: 1800
    })

    req.userId = user._id;
    res.header("auth-token", token).status(200).json(user)

}

export const signUp = async (req: Request, res: Response) => {

    const user: IUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    
    user.password = await user.encryptPassword(user.password)

    const savedUser = await user.save();
    const token: string = jwt.sign({id: savedUser._id}, process.env.SECRET_TOKEN || "ALTERNATIVE_TOKEN" )
    req.userId = savedUser._id;
    res.header('auth-token', token).json({
        "savedUser": savedUser
    })
    res.send("signup")

}

export const profile = async(req: Request, res: Response) => {
   const user = await User.findById(req.userId)
   if(!user) return res.status(404).json("User not Found");
   res.json(user);
}