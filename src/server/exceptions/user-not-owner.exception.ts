import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class UserNotOwnerException extends HttpException {

    constructor() {
        super({
            message: "User is not owner of this server",
            code: CustomExceptionsCode.USER_NOT_FOUND
        }, HttpStatus.NOT_FOUND)
    }

}