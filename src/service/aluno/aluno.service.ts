/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from '../../model/aluno.model';
import { ServiceBase } from '../service';
import { Repository } from 'typeorm';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class AlunoService extends ServiceBase<Aluno> {
    constructor(@InjectRepository(Aluno) public repository: Repository<Aluno>) {
        super(repository);
    }

    public objectToDtoPaginate(values: Aluno[]): PaginateItemColumnDto {
        const res = [];
        for(const item of values) {
            const temp = [];
            temp.push(item.id, item.nome, item.sobrenome, item.matricula, item.responsavel.map(e => `${e.nome} (${e.matricula})`).join('<br/>'));
            res.push(temp);
        }

        return new PaginateItemColumnDto(['ID', 'Nome', 'Sobrenome', 'Matrícula', 'Responsável'], res)
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

    async alunosPorResponsavel(id) {
        return await this.repository
            .createQueryBuilder('alun')
            .innerJoinAndSelect('alun.responsavel', 'resp')
            .where('resp.id = :id', { id })
            .getMany();
    }
}
