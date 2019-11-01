import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string,
    iat: number,
    exp:number
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token  = req.header('auth-token');
        //console.log(token)
        if(!token){
            res.status(401).json("Access Denied")
        }else{
            const payload = jwt.verify(token, process.env.SECRET_TOKEN || "ALTERNATIVE_TOKEN") as IPayload;
            console.log(payload) 
            console.log('request ip', req.ip);
            console.log('secure protocool', req.secure);
            req.userId = payload._id;   
            next();
        }
        
    } catch (error) {
        res.send("Token expired, init sesion again").status(400)
    }
   
}