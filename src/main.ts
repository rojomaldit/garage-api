import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require("cors");


async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//use cors as middleware
	app.use(cors())

  // validate dto files
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

	await app.listen(3001);
}
bootstrap();
