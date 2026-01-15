import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const config = new DocumentBuilder()
		.setTitle('Vox')
		.setDescription('Vox is a chat with invoice to be a project for my portfolio.')
		.setVersion('1.0')
		.addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'JWT-auth',
		)
		.addSecurityRequirements({
			'JWT-auth': [],
		})
		.build();

	const document = SwaggerModule.createDocument(app, config);

	const swaggerOptions = {
		swaggerOptions: {
			authAction: {
				'JWT-auth': {
					name: 'JWT-auth',
					schema: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
					value: 'Bearer <your-jwt-token-here>',
				},
			},
			persistAuthorization: true,
		},
	};

	SwaggerModule.setup('api', app, document, {
		customSiteTitle: 'Vox API Documentation',
		customfavIcon: 'https://your-domain.com/favicon.ico',
		customCss: '.swagger-ui .topbar { background-color: #3f51b5; }',
		swaggerOptions: swaggerOptions.swaggerOptions,
	});

	app.useGlobalFilters(new HttpExceptionFilter(configService));
	app.enableCors({
		origin: "http://localhost:5173",
		credentials: true,
	});
	app.use(cookieParser());

	await app.listen(process.env.PORT ?? 4000);
}

bootstrap();