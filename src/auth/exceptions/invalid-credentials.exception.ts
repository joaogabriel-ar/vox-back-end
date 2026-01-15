import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptionsEnum";

export class InvalidCredentialsException extends HttpException {

    constructor() {
        super({
            message: 'Invalid credentials',
            code: CustomExceptionsCode.INVALID_CREDENTIALS
        }, HttpStatus.UNAUTHORIZED)
    }

}