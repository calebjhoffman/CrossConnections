-- AlterTable
ALTER TABLE "BibleContextTopic" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'manual',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'published',
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "BibleEvent" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'manual',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'published',
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "BibleSectionHeading" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "BibleVerseContext" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'manual',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'published',
ADD COLUMN     "updatedById" TEXT;

-- CreateIndex
CREATE INDEX "BibleContextTopic_category_idx" ON "BibleContextTopic"("category");

-- CreateIndex
CREATE INDEX "BibleContextTopic_status_idx" ON "BibleContextTopic"("status");

-- CreateIndex
CREATE INDEX "BibleContextTopic_source_idx" ON "BibleContextTopic"("source");

-- CreateIndex
CREATE INDEX "BibleContextTopic_createdById_idx" ON "BibleContextTopic"("createdById");

-- CreateIndex
CREATE INDEX "BibleContextTopic_updatedById_idx" ON "BibleContextTopic"("updatedById");

-- CreateIndex
CREATE INDEX "BibleEvent_status_idx" ON "BibleEvent"("status");

-- CreateIndex
CREATE INDEX "BibleEvent_source_idx" ON "BibleEvent"("source");

-- CreateIndex
CREATE INDEX "BibleEvent_orderIndex_idx" ON "BibleEvent"("orderIndex");

-- CreateIndex
CREATE INDEX "BibleEvent_createdById_idx" ON "BibleEvent"("createdById");

-- CreateIndex
CREATE INDEX "BibleEvent_updatedById_idx" ON "BibleEvent"("updatedById");

-- CreateIndex
CREATE INDEX "BibleSectionHeading_source_idx" ON "BibleSectionHeading"("source");

-- CreateIndex
CREATE INDEX "BibleSectionHeading_createdById_idx" ON "BibleSectionHeading"("createdById");

-- CreateIndex
CREATE INDEX "BibleSectionHeading_updatedById_idx" ON "BibleSectionHeading"("updatedById");

-- CreateIndex
CREATE INDEX "BibleVerseContext_status_idx" ON "BibleVerseContext"("status");

-- CreateIndex
CREATE INDEX "BibleVerseContext_source_idx" ON "BibleVerseContext"("source");

-- CreateIndex
CREATE INDEX "BibleVerseContext_createdById_idx" ON "BibleVerseContext"("createdById");

-- CreateIndex
CREATE INDEX "BibleVerseContext_updatedById_idx" ON "BibleVerseContext"("updatedById");
