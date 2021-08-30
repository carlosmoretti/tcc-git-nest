import { jwtConstants } from './../../constants';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Responsavel } from 'src/model/responsavel.model';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { ServiceBase } from '../service';

@Injectable()
export class ResponsavelService extends ServiceBase<Responsavel> {
    constructor(
        @InjectRepository(Responsavel)
        public repository: Repository<Responsavel>,
    ) {
        super(repository);
    }

    async create(resp: Responsavel) {
        resp.senha = await bcrypt.hash(resp.senha, jwtConstants.bcrypt_salts);
        super.create(resp);
    }
}
