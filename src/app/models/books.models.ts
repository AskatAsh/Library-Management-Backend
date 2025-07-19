import { model, Schema } from "mongoose";
import { IBooks, IBookStaticMethods } from "../interfaces/books.interface";

const booksSchema = new Schema<IBooks, IBookStaticMethods>({
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

// static method
booksSchema.static('updateAvailable', async function (bookId, quantity) {
    if (!quantity || !(quantity >= 0)) {
        throw new Error("Invalid quantity! Make sure quantity is not zero or string")
    }

    // find book by id provided in borrow route
    const book = await this.findById(bookId);

    if (!book) throw new Error("Book not found! Try Again with another book.");
    if (book.copies < quantity) throw new Error(`Not enough copies available. Found ${book.copies} copies.`);

    // reduce book copies from quantity if available
    book.copies -= quantity;
    if (book.copies === 0) book.available = false;

    await book.save();
})

// pre save hook for isbn validation using isbn3 (optional)

// booksSchema.pre('save', function (next) {
//     const isValidIsbn = ISBN.parse(this.isbn);
//     if (isValidIsbn?.isValid || isValidIsbn?.isIsbn13 || isValidIsbn?.isIsbn10) {
//         next();
//     } else {
//         const err = new Error('Invalid ISBN number provided. Add 13 or 10 digit ISBN with 978 prefix.');
//         next(err);
//     }
// })

export const Book = model<IBooks, IBookStaticMethods>('Book', booksSchema);