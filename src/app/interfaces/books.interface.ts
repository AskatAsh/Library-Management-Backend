import { Model, Types } from 'mongoose';

export interface IBooks {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}

export interface IBookStaticMethods extends Model<IBooks> {
    updateAvailable(bookId: Types.ObjectId, quantity: number): void
}