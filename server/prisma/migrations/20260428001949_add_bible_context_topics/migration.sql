-- CreateTable
CREATE TABLE "BibleContextTopic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleContextTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleVerseContext" (
    "id" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "topicId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BibleVerseContext_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BibleContextTopic_slug_key" ON "BibleContextTopic"("slug");

-- CreateIndex
CREATE INDEX "BibleVerseContext_book_chapter_verse_idx" ON "BibleVerseContext"("book", "chapter", "verse");

-- CreateIndex
CREATE INDEX "BibleVerseContext_topicId_idx" ON "BibleVerseContext"("topicId");

-- AddForeignKey
ALTER TABLE "BibleVerseContext" ADD CONSTRAINT "BibleVerseContext_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "BibleContextTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
