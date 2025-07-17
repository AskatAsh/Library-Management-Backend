import express, { Request, Response } from 'express';
import z from 'zod';
import { Book } from '../models/books.models';

export const booksRoutes = express.Router();

// zod schema for validation
const booksZodSchema = z.object(
    {
        title: z.string(),
        author: z.string(),
        genre: z.string(),
        isbn: z.string(),
        description: z.string().optional(),
        copies: z.number(),
        available: z.boolean().optional()
    }
)

// Create book
booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        // validate request body with zod schema
        const body = await booksZodSchema.parseAsync(req.body);

        // create book in database with book model
        const book = await Book.create(body);

        // response status and response data
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        // error status and error data
        res.status(500).json({
            success: false,
            message: error?.message || "Internal server error creating books.",
            error: error,
        })
    }
})

// Get all books or filtered books
booksRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
    })
})