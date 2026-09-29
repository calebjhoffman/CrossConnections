-- CreateTable
CREATE TABLE "VerseComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verseId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerseComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VerseComment_verseId_idx" ON "VerseComment"("verseId");

-- CreateIndex
CREATE INDEX "VerseComment_userId_idx" ON "VerseComment"("userId");

-- CreateIndex
CREATE INDEX "VerseComment_verseId_createdAt_idx" ON "VerseComment"("verseId", "createdAt");

-- AddForeignKey
ALTER TABLE "VerseComment" ADD CONSTRAINT "VerseComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerseComment" ADD CONSTRAINT "VerseComment_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "BibleVerse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
