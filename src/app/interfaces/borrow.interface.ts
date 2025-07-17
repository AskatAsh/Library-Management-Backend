import { Model, Types } from "mongoose";

export interface IBorrow {
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}

export interface IBorrowStaticMethods extends Model<IBorrow> {
    updateAvailable(bookId: string): unknown
}

// book (objectId) — Mandatory. References the borrowed book’s ID.
// quantity (number) — Mandatory. Positive integer representing the number of copies borrowed.
// dueDate (date) — Mandatory. The date by which the book must be returned.