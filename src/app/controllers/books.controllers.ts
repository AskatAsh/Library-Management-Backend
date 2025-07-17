import express, { Request, Response } from 'express';

export const booksRoutes = express.Router();

booksRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
    })
})