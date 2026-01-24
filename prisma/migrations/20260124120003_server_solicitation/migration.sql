-- CreateTable
CREATE TABLE "server_solicitation" (
    "id" SERIAL NOT NULL,
    "server_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "server_solicitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_solicitation_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "server_solicitation_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "server_solicitation_status_name_key" ON "server_solicitation_status"("name");

-- AddForeignKey
ALTER TABLE "server_solicitation" ADD CONSTRAINT "server_solicitation_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "server_solicitation_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
