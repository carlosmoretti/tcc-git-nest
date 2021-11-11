import { AlunoService } from './../../service/aluno/aluno.service';
/* eslint-disable prettier/prettier */
import { AgendaService } from './../../service/agenda/agenda.service';
import { Public } from 'src/config/public.config';
import { Controller, Get, Query, Param } from '@nestjs/common';

@Public()
@Controller('consulta-responsavel')
export class ConsultaResponsavelController {

    constructor(public alunoService: AlunoService, public agendaService: AgendaService) {
    }

    @Get('/:matricula')
    async getByCpf(@Param('matricula') matricula: string) {
        return await this.alunoService.getByMatriculaResponsavel(matricula);
    }

    @Get('/agenda/:matriculaAluno')
    async agendaPorMatriculaAluno(@Param('matriculaAluno') matriculaAluno: string,
        @Query('dataInicio') dataInicio: string,
        @Query('dataFim') dataFim: string) {
        
        const dataInicioDate = new Date(dataInicio);
        const dataFimDate = new Date(dataFim);

        console.log(dataInicio, dataFim);

        return await this.agendaService.agendaPorMatriculaData(matriculaAluno, dataInicioDate, dataFimDate);
    }
}
