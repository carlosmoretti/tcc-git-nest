import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './module/pessoa/pessoa.module';
import { AuthModule } from './module/auth/auth.module';
import { InternoController } from './controller/interno/interno.controller';
import { InternoService } from './service/interno/interno.service';

@Module({
    imports: [TypeOrmModule.forRoot(), PessoaModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
