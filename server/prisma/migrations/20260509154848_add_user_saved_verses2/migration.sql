-- CreateTable
CREATE TABLE "UserSavedVerse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verseId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSavedVerse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSavedVerse_userId_idx" ON "UserSavedVerse"("userId");

-- CreateIndex
CREATE INDEX "UserSavedVerse_verseId_idx" ON "UserSavedVerse"("verseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSavedVerse_userId_verseId_key" ON "UserSavedVerse"("userId", "verseId");

-- AddForeignKey
ALTER TABLE "UserSavedVerse" ADD CONSTRAINT "UserSavedVerse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedVerse" ADD CONSTRAINT "UserSavedVerse_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "BibleVerse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
