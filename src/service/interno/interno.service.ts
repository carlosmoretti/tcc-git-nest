import { jwtConstants } from './../../constants';
import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
import { Repository } from 'typeorm';
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { ServiceBase } from '../service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InternoService extends ServiceBase<Interno> {
    constructor(@InjectRepository(Interno) public repository: Repository<Interno>,
        public historicoSenhaService: HistoricotrocasenhaService) {
        super(repository);
    }

    async create(obj) {
        obj.senha = jwtConstants.senhaPendente;
        obj.senha = await bcrypt.hash(obj.senha, jwtConstants.bcrypt_salts);

        super.create(obj);
        this.historicoSenhaService.redefinicaoSenha(obj.email, 'interno');
    }
}
