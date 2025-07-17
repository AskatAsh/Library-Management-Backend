import { model, Schema } from "mongoose";
import { IBorrow, IBorrowStaticMethods } from "../interfaces/borrow.interface";
import { Book } from "./books.models";

const borrowSchema = new Schema<IBorrow, IBorrowStaticMethods>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

// static method
borrowSchema.static('updateAvailable', async function (bookId, next) {
    const result = await Book.findByIdAndUpdate(bookId, { available: false });
    return result;
})

export const Borrow = model<IBorrow, IBorrowStaticMethods>('Borrow', borrowSchema);