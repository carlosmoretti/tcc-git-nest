/* eslint-disable prettier/prettier */
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

    async create(obj: Aluno) {
        obj.dataInclusao = new Date();
        super.create(obj);
    }

    async getByMatricula(matricula: string) {
        return await this.repository
            .createQueryBuilder('mat')
            .where('mat.matricula = :matricula', { matricula })
            .getOne();
    }

    async getByMatriculaResponsavel(matricula: string) {
        return await this.repository
            .createQueryBuilder('alun')
            .innerJoinAndSelect('alun.responsavel', 'resp')
            .where('resp.matricula = :matricula', { matricula })
            .getMany();
    }
}
