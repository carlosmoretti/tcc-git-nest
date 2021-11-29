import { RegistroService } from './../../service/registro/registro.service';
import { AlunoService } from './../../service/aluno/aluno.service';
/* eslint-disable prettier/prettier */
import { AgendaService } from './../../service/agenda/agenda.service';
import { Public } from 'src/config/public.config';
import { Controller, Get, Query, Param, Put } from '@nestjs/common';

@Public()
@Controller('consulta-responsavel')
export class ConsultaResponsavelController {

    constructor(public alunoService: AlunoService, public agendaService: AgendaService,
        public registroService: RegistroService) {
    }

    @Get('/:matricula')
    async getByCpf(@Param('matricula') matricula: string) {
        return await this.alunoService.getByMatriculaResponsavel(matricula);
    }

    @Get('/agenda/:matriculaAluno')
    async agendaPorMatriculaAluno(@Param('matriculaAluno') matriculaAluno: string,
        @Query('dataInicio') dataInicio: string,
        @Query('dataFim') dataFim: string) {
        return await this.agendaService.agendaPorMatriculaData(matriculaAluno, dataInicio, dataFim);
    }

    @Put('/visualizar/:idRegistro')
    async visualizarRegistro(@Param('idRegistro') idRegistro: number) {
        const registro = await this.registroService.get(idRegistro);
        registro.visualizado = true;
        registro.dataVisualizacao = new Date();
        await this.registroService.update(registro);
    }
}
