/* eslint-disable prettier/prettier */
import { ExcecaoGenerica } from './../../exceptions/excecaoGenerica.exception';
import { AlunoService } from './../../service/aluno/aluno.service';
import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common';
import { Aluno } from '../../model/aluno.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Public } from 'src/config/public.config';

@Controller('aluno')
@Public()
export class AlunoController extends ControllerBase<Aluno> {
    constructor(public service: AlunoService) {
        super(service);
    }

    @Get('matricula')
    async getByMatricula(@Query('matricula') matricula: string) {
        const itens = await this.service.getByMatricula(matricula);
        
        if(itens == null)
            throw new ExcecaoGenerica('Não encontramos usuários com essa matricula.', HttpStatus.NOT_FOUND);

        return itens;
    }
}
