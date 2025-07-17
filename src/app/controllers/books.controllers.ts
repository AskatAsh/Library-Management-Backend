import express, { NextFunction, Request, Response } from 'express';
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
booksRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
})

// Get all books or filtered books
booksRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy, sort, limit } = req.query as {
            filter?: string;
            sortBy?: string;
            sort?: 'asc' | 'desc';
            limit?: string;
        };

        let query;

        const genreFilter = filter ? { genre: filter.toUpperCase() } : '';

        const sortFilter = sortBy ? `${sort === 'desc' ? '-' : ''}${sortBy || "createdAt"}` : '';

        if (genreFilter) {
            query = Book.find(genreFilter);
        } else {
            query = Book.find();
        }

        if (sortFilter) {
            query.sort(sortFilter);
        }

        if (limit && !isNaN(Number(limit))) {
            query.limit(Number(limit));
        }

        const books = await query;

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })

    } catch (error) {
        next(error)
    }
})

// Get book by id
booksRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })

    } catch (error) {
        next(error)
    }
})

// Update a book
booksRoutes.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;

        const updateResult = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateResult
        })

    } catch (error) {
        next(error)
    }
})

// Delete a book
booksRoutes.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;

        const deleteResult = await Book.findByIdAndDelete(bookId);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: deleteResult
        })

    } catch (error) {
        next(error)
    }
})