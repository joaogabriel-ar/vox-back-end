import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptionsEnum";

export class DuplicateEmailException extends HttpException {

    constructor() {
        super({
            message: "Duplicate email",
            code: CustomExceptionsCode.DUPLICATE_EMAIL
        }, HttpStatus.BAD_REQUEST)
    }

}