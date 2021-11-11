/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuracao } from 'src/model/configuracao.model';
import { Repository } from 'typeorm';
import { ServiceBase } from '../service';

@Injectable()
export class ConfiguracaoService extends ServiceBase<Configuracao> {
    constructor(@InjectRepository(Configuracao) public repository: Repository<Configuracao>) {
        super(repository);
    }

    public async getByNome(nome: string) {
        return await this.repository.createQueryBuilder('conf')
            .where('conf.nome = :nome', { nome })
            .getOne();
    }
}
