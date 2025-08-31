
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controllers';
import { borrowRoutes } from './app/controllers/borrow.controllers';
import { AppError } from './app/errors/error.class';

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://library-management-2025.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Library Management Backend.'
    });
});

// 404 route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found!',
        error: {
            status: 404,
            message: 'Route Not Found!'
        }
    });
    next();
});

// global error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    const defaultError = {
        status: 500,
        name: 'Server Error',
        message: 'Internal Server Error! Check Error and Try Again!'
    };

    if (error instanceof AppError) {
        res.status(error.status).json({
            success: false,
            message: error.message,
            error: error.toJSON(),
        });
    } else if (error instanceof Error) {
        res.status(500).json({
            success: false,
            message: error.message || defaultError.message,
            error: {
                ...defaultError,
                name: error.name,
                message: error.message,
            },
        });
    } else {
        res.status(500).json({
            success: false,
            message: defaultError.message,
            error: defaultError,
        });
    }
    next();
});
export default app;