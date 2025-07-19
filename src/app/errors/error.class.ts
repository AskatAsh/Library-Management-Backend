export class AppError extends Error {
    status: number;

    constructor(message: string, status: number = 500, name: string = 'Server Error') {
        super(message);

        this.name = name;
        this.status = status;

        Object.setPrototypeOf(this, new.target.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}