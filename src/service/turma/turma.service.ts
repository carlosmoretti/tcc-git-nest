import { InjectRepository } from '@nestjs/typeorm';
/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Turma } from 'src/model/turma.model';
import { ServiceBase } from '../service';

@Injectable()
export class TurmaService extends ServiceBase<Turma> {
    constructor(@InjectRepository(Turma) public repository: Repository<Turma>) {
        super(repository);
    }
}
