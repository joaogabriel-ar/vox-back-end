import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class ServerNotFoundException extends HttpException {

    constructor() {
        super({
            message: "User not found",
            code: CustomExceptionsCode.USER_NOT_FOUND
        }, HttpStatus.NOT_FOUND)
    }

}