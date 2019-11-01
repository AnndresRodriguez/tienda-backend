import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/tienda" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(db => console.log("Connection to Database: Success"))
.catch(err => console.log(err))

export default mongoose;    

