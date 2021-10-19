import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
/* eslint-disable prettier/prettier */
import { SharedModule } from './../shared/shared.module';
import { EmailService } from './../../service/email/email.service';
import { InternoAuthService } from './../../service/auth/interno.auth.service';
import { Interno } from './../../model/interno.model';
import { Responsavel } from './../../model/responsavel.model';
import { ResponsavelAuthService } from './../../service/auth/responsavel.auth.service';
import { RolesGuard } from './../../guards/role.guard';
import { JwtAuthGuard } from './../../guards/jwtauth.guard';
import { JwtStrategy } from './../../strategy/jwt.strategy';
import { jwtConstants } from './../../constants';
import { AuthController } from './../../controller/auth/auth.controller';
import { PessoaModule } from '../pessoa/pessoa.module';
import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from '../../model/aluno.model';
import { JwtModule } from '@nestjs/jwt';
import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';

export const IS_PUBLIC_KEY = 'isPublic';

@Module({
    imports: [
        TypeOrmModule.forFeature([Aluno, Responsavel, Interno, HistoricoTrocaSenha]),
        PessoaModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
        SharedModule
    ],
    providers: [
        ResponsavelAuthService,
        InternoAuthService,
        HistoricotrocasenhaService,
        JwtStrategy,
        { provide: 'APP_GUARD', useClass: JwtAuthGuard },
        { provide: 'APP_GUARD', useClass: RolesGuard },
    ],
    controllers: [AuthController],
})
export class AuthModule {}
