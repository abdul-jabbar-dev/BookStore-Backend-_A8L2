/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Credential_email_key" ON "Credential"("email");
