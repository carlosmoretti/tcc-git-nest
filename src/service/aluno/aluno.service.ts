import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from '../../model/aluno.model';
import { ServiceBase } from '../service';
import { Repository } from 'typeorm';

@Injectable()
export class AlunoService extends ServiceBase<Aluno> {
    constructor(@InjectRepository(Aluno) public repository: Repository<Aluno>) {
        super(repository);
    }
}
