-- AddForeignKey
ALTER TABLE "server_solicitation" ADD CONSTRAINT "server_solicitation_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_solicitation" ADD CONSTRAINT "server_solicitation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
