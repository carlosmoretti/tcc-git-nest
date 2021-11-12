import { ConfiguracaoService } from './../../service/configuracao/configuracao.service';
import { Configuracao } from './../../model/configuracao.model';
import { Controller, Get, Param } from '@nestjs/common';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';

@Controller('configuracao')
@Roles(RoleEnum.Interno)
export class ConfiguracaoController extends ControllerBase<Configuracao> {
    constructor(public service: ConfiguracaoService) {
        super(service);
    }

    @Get('/parametro/:nome')
    public async getByNome(@Param('nome') nome: string) {
        const res = await this.service.getByNome(nome);
        return res;
    }
}
