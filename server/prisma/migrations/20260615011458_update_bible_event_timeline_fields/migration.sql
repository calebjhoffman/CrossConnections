/*
  Warnings:

  - You are about to drop the column `chapter` on the `BibleEventPassage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `BibleEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BibleEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterStart` to the `BibleEventPassage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BibleEvent_createdById_idx";

-- DropIndex
DROP INDEX "BibleEvent_updatedById_idx";

-- DropIndex
DROP INDEX "BibleEventPassage_book_chapter_idx";

-- AlterTable
ALTER TABLE "BibleEvent" ADD COLUMN     "category" TEXT,
ADD COLUMN     "dateLabel" TEXT,
ADD COLUMN     "era" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BibleEventPassage" DROP COLUMN "chapter",
ADD COLUMN     "chapterEnd" INTEGER,
ADD COLUMN     "chapterStart" INTEGER NOT NULL,
ADD COLUMN     "label" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BibleEvent_slug_key" ON "BibleEvent"("slug");

-- CreateIndex
CREATE INDEX "BibleEvent_period_idx" ON "BibleEvent"("period");

-- CreateIndex
CREATE INDEX "BibleEvent_era_idx" ON "BibleEvent"("era");

-- CreateIndex
CREATE INDEX "BibleEvent_category_idx" ON "BibleEvent"("category");

-- CreateIndex
CREATE INDEX "BibleEventPassage_book_chapterStart_idx" ON "BibleEventPassage"("book", "chapterStart");
