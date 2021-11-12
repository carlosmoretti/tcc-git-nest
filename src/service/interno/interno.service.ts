import { Nivel } from './../../model/nivel.model';
/* eslint-disable prettier/prettier */
import { jwtConstants } from './../../constants';
import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { ServiceBase } from '../service';
import * as bcrypt from 'bcrypt';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class InternoService extends ServiceBase<Interno> {
    
    public objectToDtoPaginate(values: Interno[]): PaginateItemColumnDto {
        const valores = [];
        for(const value of values) {
            const valor = [value.id, value.nome, value.sobrenome, value.email, value.matricula, value.nivel.nome];
            valores.push(valor);
        }

        return new PaginateItemColumnDto(['ID', 'Nome', 'Sobrenome', 'Email', 'Matricula', 'Nível'], valores);
    }

    constructor(@InjectRepository(Interno) public repository: Repository<Interno>,
        public historicoSenhaService: HistoricotrocasenhaService,
        @InjectRepository(Nivel) public nivelRepository: Repository<Nivel>) {
        super(repository);
    }

    async create(obj) {
        obj.senha = jwtConstants.senhaPendente;
        obj.senha = await bcrypt.hash(obj.senha, jwtConstants.bcrypt_salts);

        super.create(obj);
        this.historicoSenhaService.redefinicaoSenha(obj.email, 'interno');
    }

    async niveis() {
        return this.nivelRepository.find();
    }
}
