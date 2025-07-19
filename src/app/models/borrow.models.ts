import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./books.models";

const borrowSchema = new Schema<IBorrow>({
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

borrowSchema.pre('save', async function (next) {
    try {
        await Book.updateAvailable(this.book, this.quantity);
        next();
    } catch (error: any) {
        next(error);
    }
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema);