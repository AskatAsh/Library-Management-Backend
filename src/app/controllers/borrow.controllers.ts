import express, { Request, Response } from 'express';

export const borrowRoutes = express.Router();

borrowRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
    })
})