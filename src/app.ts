import express, { Application } from 'express';
import authRoutes from './routes/auth';
import morgan from 'morgan';
import bodyParser from 'body-parser'
const app: Application = express();

//Configuración Inicial

app.locals.lang = "es"
app.locals.author = "Andres Joel Carrillo";
app.locals.email = "andresjoe24@gmail.com";
   

app.set("port", 3000);


//Middlewares
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);


export default app;

