-- CreateTable
CREATE TABLE "BibleEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "period" TEXT,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleEventPassage" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verseStart" INTEGER NOT NULL,
    "verseEnd" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BibleEventPassage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BibleEventPassage_eventId_idx" ON "BibleEventPassage"("eventId");

-- CreateIndex
CREATE INDEX "BibleEventPassage_book_chapter_idx" ON "BibleEventPassage"("book", "chapter");

-- AddForeignKey
ALTER TABLE "BibleEventPassage" ADD CONSTRAINT "BibleEventPassage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "BibleEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
