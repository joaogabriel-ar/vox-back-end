import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    constructor(private configService: ConfigService) { }

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>() as any;
        const status = exception.getStatus();        

        const exceptionResponse = exception.getResponse() as { message: string; code: number };
        
        const isProduction =
            this.configService.get<string>('NODE_ENV') === 'production';
        

        this.logger.error(`Exception: ${exception.message}, status:${status} code:${exceptionResponse.code}`);

        return response.status(status).json(
            isProduction ?
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                    code: exceptionResponse.code
                } :
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                    code: exceptionResponse.code,
                    stack: exception.stack
                }
        )

    }

}