import { InternoService } from './../../service/interno/interno.service';
import { InternoController } from './../../controller/interno/interno.controller';
import { ResponsavelService } from './../../service/responsavel/responsavel.service';
import { Interno } from './../../model/interno.model';
import { Responsavel } from './../../model/responsavel.model';
import { AlunoController } from './../../controller/aluno/aluno.controller';
import { Aluno } from './../../model/aluno.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoService } from './../../service/aluno/aluno.service';
import { ResponsavelController } from 'src/controller/responsavel/responsavel.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Aluno, Responsavel, Interno])],
    providers: [AlunoService, ResponsavelService, InternoService],
    controllers: [AlunoController, ResponsavelController, InternoController],
})
export class PessoaModule {}
