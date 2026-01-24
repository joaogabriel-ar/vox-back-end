import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class ServerSolicitationNotFoundException extends HttpException {

    constructor() {
        super({
            message: "Server solicitation not found",
            code: CustomExceptionsCode.SERVER_SOLICITATION_NOT_FOUND
        }, HttpStatus.NOT_FOUND)
    }

}