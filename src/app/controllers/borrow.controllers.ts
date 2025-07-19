import express, { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { Borrow } from '../models/borrow.models';

export const borrowRoutes = express.Router();

const borrowZodSchema = z.object({
    book: z.string(),
    quantity: z.number(),
    dueDate: z.string()
});

// borrow book
borrowRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = await borrowZodSchema.parseAsync(req.body);
        // const { book, quantity, dueDate } = body;

        // if (!quantity || !(quantity >= 0)) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "Invalid quantity! Make sure quantity is not zero or string",
        //     });
        // }

        // const bookData = await Book.findById(book);

        // if (!bookData) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Book not found!",
        //     });
        // }

        // const availableCopies = bookData?.copies as number;

        // if (!(availableCopies >= quantity)) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "This Book is not available right now",
        //     });
        // }

        // new copies deducted after borrow
        // const newCopies = availableCopies - quantity;

        // update copies in books collection with deducted copies
        // const updateCopiesResult = await Book.findByIdAndUpdate(book, { copies: newCopies })

        // updates available and copies data in books collection
        // const updateResult = await Borrow.updateAvailable(bookData._id.toString(), newCopies);

        // Save the borrow record
        const savedBorrowResult = await Borrow.create(body);

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: savedBorrowResult
        });

    } catch (error) {
        next(error);
    }
});

borrowRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const borrowdBooksSummery = await Borrow.aggregate(
            [
                {
                    $lookup: {
                        from: 'books',
                        localField: 'book',
                        foreignField: '_id',
                        as: 'book'
                    }
                },
                {
                    $unwind: '$book'
                },
                {
                    $group: {
                        _id: '$book',
                        totalQuantity: { $sum: '$quantity' }
                    }
                },
                {
                    $project: {
                        'totalQuantity': 1,
                        'book': {
                            title: '$_id.title',
                            isbn: '$_id.isbn',
                        },
                        '_id': 0
                    }
                }
            ]
        );

        if (!borrowdBooksSummery || borrowdBooksSummery.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Data found! No books borrowed yet!',
                data: borrowdBooksSummery
            });
        }

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrowdBooksSummery
        });

    } catch (error) {
        next(error);
    }
});