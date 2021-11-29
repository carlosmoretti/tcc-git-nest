import { Recado } from './model/recado.model';
import { Nivel } from './model/nivel.model';
import { AgendaController } from './controller/agenda/agenda.controller';
import { Agenda } from './model/agenda.model';
import { Registro } from './model/registro.model';
import { Configuracao } from './model/configuracao.model';
import { EmailService } from './service/email/email.service';
import { HomeController } from './controller/home/home.controller';
import { ResponsavelController } from './controller/responsavel/responsavel.controller';
import { AlunoController } from './controller/aluno/aluno.controller';
import { ResponsavelService } from './service/responsavel/responsavel.service';
import { AlunoService } from './service/aluno/aluno.service';
import { AuthController } from './controller/auth/auth.controller';
import { RolesGuard } from './guards/role.guard';
import { JwtAuthGuard } from './guards/jwtauth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ResponsavelAuthService } from './service/auth/responsavel.auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { HistoricoTrocaSenha } from 'src/model/historicotrocasenha.model';
import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';
import { Interno } from './model/interno.model';
import { Responsavel } from './model/responsavel.model';
import { Aluno } from './model/aluno.model';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternoController } from './controller/interno/interno.controller';
import { InternoService } from './service/interno/interno.service';
import { TurmaService } from './service/turma/turma.service';
import { TurmaController } from './controller/turma/turma.controller';
import { InternoAuthService } from './service/auth/interno.auth.service';
import { Turma } from './model/turma.model';
import { WhatsAppService } from './service/whatsapp/whatsapp.service';
import { ConfiguracaoService } from './service/configuracao/configuracao.service';
import { ConfiguracaoController } from './controller/configuracao/configuracao.controller';
import { AgendaService } from './service/agenda/agenda.service';
import { ConsultaResponsavelController } from './controller/consulta-responsavel/consulta-responsavel.controller';
import { RecadoService } from './service/recado/recado.service';
import { RecadoController } from './controller/recado/recado.controller';
import { RegistroService } from './service/registro/registro.service';
import { DashboardService } from './service/dashboard/dashboard.service';

export const IS_PUBLIC_KEY = 'isPublic';

@Module({
    imports: [TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Aluno, Responsavel, Interno, Turma, HistoricoTrocaSenha, Configuracao, Agenda, Registro, Nivel, Recado]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [
        AppController, 
        AuthController,
        AlunoController,
        ResponsavelController,
        InternoController,
        HomeController,
        TurmaController,
        ConfiguracaoController,
        AgendaController,
        ConsultaResponsavelController,
        RecadoController
    ],
    providers: [
        AppService,
        ResponsavelAuthService,
        InternoAuthService,
        JwtStrategy,
        AlunoService,
        ResponsavelService,
        InternoService,
        TurmaService,
        WhatsAppService,
        EmailService,
        HistoricotrocasenhaService,
        { provide: 'APP_GUARD', useClass: JwtAuthGuard },
        { provide: 'APP_GUARD', useClass: RolesGuard },
        ConfiguracaoService,
        AgendaService,
        RecadoService,
        RegistroService,
        DashboardService,
    ],
})
export class AppModule {}
