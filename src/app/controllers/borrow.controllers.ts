import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.models';
import { Borrow } from '../models/borrow.models';

export const borrowRoutes = express.Router();

// borrow book
borrowRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // todos
        // Verify the book has enough available copies. ✔
        // Deduct the requested quantity from the book’s copies. ✔
        // If copies become 0, update available to false (implement this using a static method or instance method). ✔
        // Save the borrow record with all relevant details. ✔

        const { book, quantity, dueDate } = req.body

        const bookData = await Book.findById(book);

        if (!bookData) {
            return res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        const availableCopies = bookData?.copies as number;

        if (!(availableCopies >= quantity)) {
            return res.status(404).json({
                success: false,
                message: "This Book is not available right now",
            });
        }

        // new copies deducted after borrow
        const newCopies = availableCopies - quantity;

        // update copies in books collection with deducted copies
        // const updateCopiesResult = await Book.findByIdAndUpdate(book, { copies: newCopies })

        // update available and copies data in books collection
        const updateResult = await Borrow.updateAvailable(bookData._id.toString(), newCopies);
        console.log(updateResult);

        // Save the borrow record
        const savedBorrowResult = await Borrow.create({ book, quantity, dueDate });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: savedBorrowResult
        })

    } catch (error) {
        next(error);
    }
})

borrowRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
    })
})