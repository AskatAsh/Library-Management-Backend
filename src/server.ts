
import app from './app';

const PORT = 5000;

function main() {
    const server = app.listen(PORT, () => {
        console.log("Server listening from port: ", PORT);
    })
}
main();