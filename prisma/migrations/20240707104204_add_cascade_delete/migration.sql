-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthorBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "AuthorBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AuthorBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AuthorBook" ("authorId", "bookId", "id") SELECT "authorId", "bookId", "id" FROM "AuthorBook";
DROP TABLE "AuthorBook";
ALTER TABLE "new_AuthorBook" RENAME TO "AuthorBook";
CREATE TABLE "new_TranslatorBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookId" INTEGER NOT NULL,
    "translatorId" INTEGER NOT NULL,
    CONSTRAINT "TranslatorBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TranslatorBook_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "Translator" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TranslatorBook" ("bookId", "id", "translatorId") SELECT "bookId", "id", "translatorId" FROM "TranslatorBook";
DROP TABLE "TranslatorBook";
ALTER TABLE "new_TranslatorBook" RENAME TO "TranslatorBook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
