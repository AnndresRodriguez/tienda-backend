import app from "./app";
import './config/database';
import dotenv from 'dotenv';
dotenv.config();

function main() {
    app.listen(app.get("port"))
    console.log("Server listening on port", app.get("port"))
}

main();