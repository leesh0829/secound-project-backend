/*
  Warnings:

  - You are about to drop the column `name` on the `test` table. All the data in the column will be lost.
  - Added the required column `content` to the `test` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[test] DROP COLUMN [name];
ALTER TABLE [dbo].[test] ADD [clock] DATETIME2,
[content] NVARCHAR(255) NOT NULL,
[month] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
