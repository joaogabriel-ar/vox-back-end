import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class ConfirmPasswordException extends HttpException {

    constructor() {
        super({
            message: "Confirm password different from password",
            code: CustomExceptionsCode.DUPLICATE_EMAIL
        }, HttpStatus.BAD_REQUEST)
    }

}