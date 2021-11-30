import { TurmaService } from './../../service/turma/turma.service';
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
        public registroService: RegistroService,
        public turmaService: TurmaService,
        public agendaService: AgendaService) {
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

    @Get('/dashboard/aluno-turma')
    async dashboardAlunoTurma() {
        const turmas = await this.turmaService.getAll();
        const dashboard = {
            turmas: [],
            total: [],
            resultado: 0
        };

        turmas.forEach(e => {
            dashboard.turmas.push(e.nome);
            dashboard.total.push(e.alunos.length);
            dashboard.resultado = dashboard.total.reduce((a,b) => a + b, 0);
        })

        return dashboard;
    }

    @Get('/dashboard/agendasHoje')
    async agendasHoje() {
        const alunosTotal = await this.alunoService.count();
        const agendasHoje = await this.agendaService.agendasHoje();
        const porcentagem = `${((agendasHoje / alunosTotal) * 100).toFixed(2)}%`;

        return {
            alunosTotal, agendasHoje, porcentagem
        }
    }
}
