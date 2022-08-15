import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./config/config";
import dotenv from 'dotenv';
dotenv.config()

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
        app.listen(process.env.PORT , () => {
          console.log(`Server is running on PORT ${process.env.PORT}`);
        });
    }catch (err){
        console.error(err);
    }
}

main();