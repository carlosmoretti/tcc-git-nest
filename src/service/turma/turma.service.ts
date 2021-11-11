import { InjectRepository } from '@nestjs/typeorm';
/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Turma } from 'src/model/turma.model';
import { ServiceBase } from '../service';
import { AuthService } from '../auth/auth.service';
import { Interno } from 'src/model/interno.model';

@Injectable()
export class TurmaService extends ServiceBase<Turma> {
    constructor(@InjectRepository(Turma) public repository: Repository<Turma>) {
        super(repository);
    }

    public async getTurmaByProfessor(professorId) {
        return this.repository.createQueryBuilder('turma')
            .where('turma.professorResponsavel.id = :professorId', { professorId })
            .getMany();
    }
}
