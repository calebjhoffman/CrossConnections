-- CreateTable
CREATE TABLE "UserVerseHighlight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verseId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVerseHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserVerseHighlight_userId_idx" ON "UserVerseHighlight"("userId");

-- CreateIndex
CREATE INDEX "UserVerseHighlight_verseId_idx" ON "UserVerseHighlight"("verseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVerseHighlight_userId_verseId_key" ON "UserVerseHighlight"("userId", "verseId");

-- AddForeignKey
ALTER TABLE "UserVerseHighlight" ADD CONSTRAINT "UserVerseHighlight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVerseHighlight" ADD CONSTRAINT "UserVerseHighlight_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "BibleVerse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
