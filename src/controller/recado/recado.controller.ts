import { Body, Get, Param, Put } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { RecadoService } from './../../service/recado/recado.service';
import { Controller, Post } from '@nestjs/common';
import { Recado } from 'src/model/recado.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Public } from 'src/config/public.config';

@Controller('recado')
@Public()
export class RecadoController extends ControllerBase<Recado> {
    
    constructor(public recadoService: RecadoService) {
        super(recadoService);
    }

    @Put('visualizar/:id')
    async visualizar(@Param('id') id: number) {
        await this.recadoService.visualizar(id);
    }

    @Post()
    async post(@Body() param: Recado) {
        param.visualizado = false;
        param.data = new Date();
        
        return await this.service.create(param);
    }

    @Get('/pendentes')
    async pendentes() {
        return await this.recadoService.pendentes();
    }
}
