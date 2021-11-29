import { RegistroService } from './../../service/registro/registro.service';
import { AgendaService } from './../../service/agenda/agenda.service';
/* eslint-disable prettier/prettier */
import { AlunoService } from './../../service/aluno/aluno.service';
import { RecadoService } from './../../service/recado/recado.service';
import { ResponsavelService } from './../../service/responsavel/responsavel.service';
import { InternoService } from './../../service/interno/interno.service';
import { Controller, Get } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { InternoAuthService } from 'src/service/auth/interno.auth.service';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Roles } from 'src/config/roles.config';

@Controller('interno')
@Public()
export class InternoController extends ControllerBase<Interno> {
    constructor(public service: InternoService, 
        public alunoService: AlunoService,
        public responsavelService: ResponsavelService,
        public recadoService: RecadoService,
        public registroService: RegistroService) {
        super(service);
    }

    @Get('/niveis')
    async niveis() {
        return await this.service.niveis();
    }

    @Get('/dashboard')
    async dashboard() {
        const totalResponsaveis = await this.responsavelService.count();
        const totalRecados = await this.recadoService.count();
        const totalAlunos = await this.alunoService.count();
        const totalAgendas = await this.registroService.count();

        return [
            { valor: totalResponsaveis, descricao: 'Responsáveis cadastrados'},
            { valor: totalRecados, descricao: 'Recados enviados'},
            { valor: totalAlunos, descricao: 'Alunos cadastrados'},
            { valor: totalAgendas, descricao: 'Agendas preenchidas'}
        ]
    }
}
