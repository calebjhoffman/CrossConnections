-- AlterTable
ALTER TABLE "BibleEvent" ADD COLUMN     "eraId" TEXT;

-- CreateTable
CREATE TABLE "BibleEra" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "dateLabel" TEXT,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "imageUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BibleEra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BibleEra_slug_key" ON "BibleEra"("slug");

-- CreateIndex
CREATE INDEX "BibleEvent_eraId_idx" ON "BibleEvent"("eraId");

-- AddForeignKey
ALTER TABLE "BibleEvent" ADD CONSTRAINT "BibleEvent_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "BibleEra"("id") ON DELETE SET NULL ON UPDATE CASCADE;
