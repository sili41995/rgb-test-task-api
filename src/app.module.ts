import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from '@src/middlewares';
import { PostModule } from '@src/entities/post';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
