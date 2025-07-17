import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const PORT = 5000;

async function main() {
    try {
        // connect to mongodb using mongoose
        await mongoose.connect(`${process.env.DATABASE_URI}`);

        console.log("Connect to Library Database Successfully");

        const server = app.listen(PORT, () => {
            console.log("Server listening from port: ", PORT);
        })
    } catch (error) {
        // show error if database connection fails or server gives errors
        console.log(error);
    }
}
main();

// todo: Setup routes