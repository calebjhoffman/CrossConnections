-- CreateTable
CREATE TABLE "UserMeta" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserMeta_userId_idx" ON "UserMeta"("userId");

-- CreateIndex
CREATE INDEX "UserMeta_key_idx" ON "UserMeta"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserMeta_userId_key_key" ON "UserMeta"("userId", "key");

-- AddForeignKey
ALTER TABLE "UserMeta" ADD CONSTRAINT "UserMeta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
