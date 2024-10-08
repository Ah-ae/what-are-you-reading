'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidatePath } from 'next/cache';

interface KaKaoBookApiResponse {
  documents: KaKaoBookResponse[];
  meta: { is_end: boolean; pageable_count: number; total_count: number };
}

export interface KaKaoBookResponse {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

export async function searchBooks(
  query: string,
  target: string = 'title',
  page: number = 1,
): Promise<KaKaoBookApiResponse> {
  const baseURL = 'https://dapi.kakao.com/v3/search/book';
  const params = {
    query,
    target,
    page: page.toString(),
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  const response = await fetch(finalURL, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function getMoreBooks(page: number, query: string, target: string) {
  const initialData = await searchBooks(query, target, page);
  const session = await getSession();

  if (!session || !session.id) {
    // If session is not available, return initial data
    return initialData;
  }

  const ownedBooks = await checkOwnedBooks(initialData.documents, session.id);

  return {
    documents: ownedBooks,
    meta: initialData.meta,
  };
}

export const checkOwnedBooks = async (bookList: KaKaoBookResponse[], userId: number) => {
  const isbnList = bookList.map((book) => book.isbn);

  const ownedBooks = await db.book.findMany({
    where: {
      isbn: { in: isbnList },
      Bookshelf: {
        ownerId: userId,
      },
    },
    select: { isbn: true },
  });

  const ownedIsbnSet = new Set(ownedBooks.map((book) => book.isbn));

  const ownedBookList = bookList.map((book) => ({
    ...book,
    isOwned: ownedIsbnSet.has(book.isbn),
  }));

  return ownedBookList;
};

export const createBook = async (book: Omit<KaKaoBookResponse, 'contents' | 'sale_price' | 'status'>) => {
  const session = await getSession();
  if (!session.id) return;

  const createdBook = await db.book.create({
    data: {
      title: book.title,
      datetime: book.datetime,
      price: book.price,
      publisher: book.publisher,
      thumbnail: book.thumbnail,
      url: book.url,
      isbn: book.isbn,
      Bookshelf: {
        connect: {
          ownerId: session.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  //* Handle authors
  const authors = await db.author.findMany({
    where: {
      name: { in: book.authors },
    },
  });

  const authorMap = new Map(authors.map((author) => [author.name, author.id]));

  const authorPromises = book.authors.map(async (authorName) => {
    const authorId = authorMap.get(authorName);
    if (!authorId) {
      // Create a new author if not found
      const newAuthor = await db.author.create({
        data: { name: authorName },
      });
      authorMap.set(authorName, newAuthor.id);
    }

    // Connect the book with the author
    await db.authorBook.create({
      data: {
        bookId: createdBook.id,
        authorId: authorMap.get(authorName)!, // ! to assert that authorId exists
      },
    });
  });

  // Wait for all promises to resolve
  await Promise.all(authorPromises);

  //* Handle translators
  if (book.translators.length > 0) {
    const translators = await db.translator.findMany({
      where: {
        name: { in: book.translators },
      },
    });

    const translatorMap = new Map(translators.map((translator) => [translator.name, translator.id]));

    const translatorPromises = book.translators.map(async (translatorName) => {
      const translatorId = translatorMap.get(translatorName);
      if (!translatorId) {
        // Create a new translator if not found
        const newTranslator = await db.translator.create({
          data: { name: translatorName },
        });
        translatorMap.set(translatorName, newTranslator.id);
      }

      // Connect the book with the translator
      await db.translatorBook.create({
        data: {
          bookId: createdBook.id,
          translatorId: translatorMap.get(translatorName)!,
        },
      });
    });

    // Wait for all promises to resolve
    await Promise.all(translatorPromises);
  }

  revalidatePath('/mine');
};
