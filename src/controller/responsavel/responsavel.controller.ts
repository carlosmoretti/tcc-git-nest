/* eslint-disable prettier/prettier */
import { EmailService } from './../../service/email/email.service';
import { AlunoService } from './../../service/aluno/aluno.service';
import { ResponsavelService } from './../../service/responsavel/responsavel.service';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Responsavel } from 'src/model/responsavel.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Public } from 'src/config/public.config';
import { WhatsAppService } from 'src/service/whatsapp/whatsapp.service';

@Controller('responsavel')
@Public()
// @Roles(RoleEnum.Interno)
export class ResponsavelController extends ControllerBase<Responsavel> {
    constructor(public service: ResponsavelService, 
        public whatsappService: WhatsAppService,
        public alunoService: AlunoService,
        public emailService: EmailService) {
        super(service);
    }

    @Post('email')
    teste() {
        this.emailService.enviar('Teste', '<h1>Teste</h1>', 'carlosmoretti2019@gmail.com');
    }

    @Get(':id/alunos')
    public async getAlunos(@Param('id') responsavelId) {
        return await this.alunoService.alunosPorResponsavel(responsavelId);
    }
}
