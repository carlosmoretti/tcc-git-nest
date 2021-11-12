/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Turma } from 'src/model/turma.model';
import { ServiceBase } from '../service';
import { AuthService } from '../auth/auth.service';
import { Interno } from 'src/model/interno.model';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class TurmaService extends ServiceBase<Turma> {
    
    public objectToDtoPaginate(values: Turma[]): PaginateItemColumnDto {
        const valores = [];
        values.forEach(value => {
            const res = [value.id, value.matricula, value.professorResponsavel.nome];
            valores.push(res);
        });

        return new PaginateItemColumnDto(['ID', 'Turma', 'Professor'], valores);
    }

    constructor(@InjectRepository(Turma) public repository: Repository<Turma>) {
        super(repository);
    }

    public async getTurmaByProfessor(professorId) {
        return this.repository.createQueryBuilder('turma')
            .where('turma.professorResponsavel.id = :professorId', { professorId })
            .getMany();
    }
}