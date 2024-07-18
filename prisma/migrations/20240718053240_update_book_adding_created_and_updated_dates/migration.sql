/*
  Warnings:

  - Added the required column `updated_at` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "review" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "bookshelfId" INTEGER NOT NULL,
    CONSTRAINT "Book_bookshelfId_fkey" FOREIGN KEY ("bookshelfId") REFERENCES "Bookshelf" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("bookshelfId", "datetime", "id", "isbn", "price", "publisher", "rating", "review", "thumbnail", "title", "url") SELECT "bookshelfId", "datetime", "id", "isbn", "price", "publisher", "rating", "review", "thumbnail", "title", "url" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
