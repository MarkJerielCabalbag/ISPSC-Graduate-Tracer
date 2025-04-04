-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_programId_fkey";

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
