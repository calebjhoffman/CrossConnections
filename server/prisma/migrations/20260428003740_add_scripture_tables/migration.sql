-- CreateTable
CREATE TABLE "BibleTranslation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "source" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleBook" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "testament" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibleVerse" (
    "id" TEXT NOT NULL,
    "translationId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleVerse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BibleTranslation_code_key" ON "BibleTranslation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BibleBook_slug_key" ON "BibleBook"("slug");

-- CreateIndex
CREATE INDEX "BibleVerse_bookId_chapter_idx" ON "BibleVerse"("bookId", "chapter");

-- CreateIndex
CREATE INDEX "BibleVerse_translationId_bookId_chapter_idx" ON "BibleVerse"("translationId", "bookId", "chapter");

-- CreateIndex
CREATE UNIQUE INDEX "BibleVerse_translationId_bookId_chapter_verse_key" ON "BibleVerse"("translationId", "bookId", "chapter", "verse");

-- AddForeignKey
ALTER TABLE "BibleVerse" ADD CONSTRAINT "BibleVerse_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "BibleTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibleVerse" ADD CONSTRAINT "BibleVerse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BibleBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
