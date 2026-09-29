-- AlterTable
ALTER TABLE "BibleVerse" ADD COLUMN     "blockLevel" INTEGER,
ADD COLUMN     "blockType" TEXT,
ADD COLUMN     "headingBefore" TEXT,
ADD COLUMN     "paragraphIndex" INTEGER,
ADD COLUMN     "paragraphStart" BOOLEAN NOT NULL DEFAULT false;
