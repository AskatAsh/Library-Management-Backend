import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

const booksSchema = new Schema<IBooks>({
    title: {
        type: String,
        required: [true, "Book title required. Add a book title."],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Book author name required. Add author name."],
        trim: true
    },
    genre: {
        type: String,
        required: [true, "Book genre required. Add a genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)"],
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        uppercase: true
    },
    isbn: {
        type: String,
        required: [true, "Book ISBN required."],
        unique: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    copies: {
        type: Number,
        validate: {
            validator: function (v) {
                return v >= 0;
            },
            message: props => `Copies cannot be negative. Got ${props.value}`
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export const Book = model('Book', booksSchema);