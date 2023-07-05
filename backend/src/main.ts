import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [SuperTokensConfig.appInfo.websiteDomain],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  
  supertokens.init({
    supertokens: {
        connectionURI: "http://localhost:3567",
        apiKey: "someKey" // OR can be undefined
    },
    appInfo: {
        apiDomain: "http://localhost:3000",
        appName: "prosupertokens",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: []
});

  app.useGlobalFilters(new SupertokensExceptionFilter());
  await app.listen(3001);
}
bootstrap();
