-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MyData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT,
    "age" INTEGER,
    "balance" REAL,
    "rating" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT NOT NULL DEFAULT 'A',
    "dateOnly" TEXT,
    "dateTime" TEXT,
    "timeOnly" TEXT,
    "website" TEXT,
    "avatarUrl" TEXT,
    "filePath" TEXT,
    "tags" TEXT,
    "color" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MyData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MyData" ("age", "avatarUrl", "balance", "category", "color", "createdAt", "dateOnly", "dateTime", "description", "email", "filePath", "id", "isActive", "name", "passwordHash", "phone", "rating", "tags", "timeOnly", "title", "updatedAt", "userId", "website") SELECT "age", "avatarUrl", "balance", "category", "color", "createdAt", "dateOnly", "dateTime", "description", "email", "filePath", "id", "isActive", "name", "passwordHash", "phone", "rating", "tags", "timeOnly", "title", "updatedAt", "userId", "website" FROM "MyData";
DROP TABLE "MyData";
ALTER TABLE "new_MyData" RENAME TO "MyData";
CREATE UNIQUE INDEX "MyData_email_key" ON "MyData"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
