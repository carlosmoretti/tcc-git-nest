import { ResponsavelService } from './../../service/responsavel/responsavel.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Responsavel } from 'src/model/responsavel.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Public } from 'src/config/public.config';

@Controller('responsavel')
@Public()
export class ResponsavelController extends ControllerBase<Responsavel> {
    constructor(public service: ResponsavelService) {
        super(service);
    }

    // @Get(':id/alunos')
    // public async getAlunos(@Param('id') responsavelId) {
    //     const item = await this.service.get(responsavelId);
    //     return item.alunos;
    // }
}
