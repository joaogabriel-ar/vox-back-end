import { HttpException, HttpStatus } from "@nestjs/common";
import CustomExceptionsCode from "src/enums/exceptions.enum";

export class FailToSaveImageException extends HttpException {

    constructor() {
        super({
            message: "Fail to save image",
            code: CustomExceptionsCode.FAIL_TO_SAVE_IMAGE
        }, HttpStatus.NOT_FOUND)
    }

}