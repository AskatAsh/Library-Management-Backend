
import express, { NextFunction, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controllers';
import { borrowRoutes } from './app/controllers/borrow.controllers';

const app = express();

app.use(express.json());

app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Welcome to Library Management Backend."
    })
})

// 404 route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found!",
        error: {
            status: 404,
            message: "Route Not Found!"
        }
    })
})

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json({
        success: false,
        message: error?.message || "Internal Server Error! Check Error and Try Again!",
        error
    })
})
export default app;