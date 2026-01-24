import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class UserAlreadyInGroup extends HttpException {

    constructor() {
        super({
            message: "User is already in this group",
            code: CustomExceptionsCode.USER_NOT_FOUND
        }, HttpStatus.NOT_FOUND)
    }

}