import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class UserNotAuthenticatedException extends HttpException {

    constructor() {
        super({
            message: 'User not authenticated',
            code: CustomExceptionsCode.USER_NOT_AUTHENTICATED
        }, HttpStatus.UNAUTHORIZED)
    }

}