-- CreateTable
CREATE TABLE "BibleSectionHeading" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verseStart" INTEGER NOT NULL,
    "verseEnd" INTEGER,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "type" TEXT NOT NULL DEFAULT 'section',
    "source" TEXT NOT NULL DEFAULT 'manual',
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleSectionHeading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BibleSectionHeading_bookId_chapter_idx" ON "BibleSectionHeading"("bookId", "chapter");

-- CreateIndex
CREATE INDEX "BibleSectionHeading_bookId_chapter_verseStart_idx" ON "BibleSectionHeading"("bookId", "chapter", "verseStart");

-- CreateIndex
CREATE INDEX "BibleSectionHeading_status_idx" ON "BibleSectionHeading"("status");

-- AddForeignKey
ALTER TABLE "BibleSectionHeading" ADD CONSTRAINT "BibleSectionHeading_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BibleBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
