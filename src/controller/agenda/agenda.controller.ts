/* eslint-disable prettier/prettier */
import { Put } from '@nestjs/common';
import { AgendaService } from './../../service/agenda/agenda.service';
import { AuthService } from 'src/service/auth/auth.service';
import { InclusaoAgendaDto } from './../../dto/inclusao-agenda.dto';
import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { Public } from 'src/config/public.config';
import { InternoAuthService } from 'src/service/auth/interno.auth.service';
import ControllerBase from '../controller';

@Public()
@Controller('agenda')
export class AgendaController extends ControllerBase<any> {

    constructor(public authService: InternoAuthService, public agendaService: AgendaService) {
        super(agendaService);
    }

    @Post('/turma/:id')
    async incluir(@Body() agenda: Array<InclusaoAgendaDto>, @Param('id') turma: number, @Headers('Authorization') token: string) {
        const usuario = await this.authService.getByToken(token.split(' ')[1]);
        await this.agendaService.createFromDto(agenda, turma, usuario.id);
    }

    @Get('/turma/:id')
    async getAllByTurma(@Param('id') turmaId: number) {
        return await this.agendaService.getAllByTurma(turmaId);
    }

    @Get('/:id/registros')
    async getAllAlunosPorRegistro(@Param('id') id: number) {
        return await this.agendaService.alunosPorAgenda(id)
    }

    @Put('/registro')
    async atualizarRegistro(@Body() registro) {
        return this.agendaService.atualizarRegistro(registro);
    }
}