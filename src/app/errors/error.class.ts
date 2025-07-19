export class AppError extends Error {
    status: number;
    name: string;

    constructor(message: string, status: number, name: string) {
        super(message);
        this.status = status;
        this.name = name;

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}