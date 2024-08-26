/*
  Warnings:

  - The primary key for the `test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `test` table. All the data in the column will be lost.
  - Added the required column `number` to the `test` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[test] DROP CONSTRAINT [test_pk];
ALTER TABLE [dbo].[test] DROP COLUMN [id];
ALTER TABLE [dbo].[test] ADD CONSTRAINT test_pk PRIMARY KEY CLUSTERED ([number]);
ALTER TABLE [dbo].[test] ADD [number] INT NOT NULL IDENTITY(1,1);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
