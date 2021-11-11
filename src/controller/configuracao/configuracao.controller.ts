import { ConfiguracaoService } from './../../service/configuracao/configuracao.service';
import { Configuracao } from './../../model/configuracao.model';
import { Controller, Get, Param } from '@nestjs/common';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';

@Public()
@Controller('configuracao')
export class ConfiguracaoController extends ControllerBase<Configuracao> {
    constructor(public service: ConfiguracaoService) {
        super(service);
    }

    @Get(':nome')
    public async getByNome(@Param('nome') nome: string) {
        const res = await this.service.getByNome(nome);
        return res;
    }
}
