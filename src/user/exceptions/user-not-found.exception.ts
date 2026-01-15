import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptionsEnum";

export class UserNotFoundException extends HttpException {

    constructor() {
        super({
            message: "User not found",
            code: CustomExceptionsCode.USER_NOT_FOUND
        }, HttpStatus.NOT_FOUND)
    }

}