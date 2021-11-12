import { ConfiguracaoService } from './../configuracao/configuracao.service';
import { EmailService } from './../email/email.service';
/* eslint-disable prefer-spread */
/* eslint-disable prettier/prettier */
import { Turma } from 'src/model/turma.model';
import { InclusaoAgendaDto } from './../../dto/inclusao-agenda.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agenda } from 'src/model/agenda.model';
import { ServiceBase } from '../service';
import { Interno } from 'src/model/interno.model';
import { Registro } from 'src/model/registro.model';
import { Aluno } from 'src/model/aluno.model';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class AgendaService extends ServiceBase<any> {
    constructor(@InjectRepository(Agenda) public repository: Repository<Agenda>,
        @InjectRepository(Turma) public turmaRepository: Repository<Turma>,
        @InjectRepository(Registro) public registroRepository: Repository<Registro>,
        @InjectRepository(Aluno) public alunoRepository: Repository<Aluno>,
        public emailService: EmailService,
        public configuracaoService: ConfiguracaoService) {
        super(repository);
    }

    public objectToDtoPaginate(values: any[]): PaginateItemColumnDto {
        throw new Error('Method not implemented.');
    }

    private criaRegistro(dto: InclusaoAgendaDto) {
        const registro = new Registro();
        registro.conteudo = dto.html;
        registro.aluno = new Aluno();
        registro.aluno.id = dto.id;
        return registro;
    }

    public async enviaEmailResponsavelAlunos(alunosId: number[]) {
        const alunosPorId = await this.alunoRepository.createQueryBuilder('aluno')
            .innerJoinAndSelect('aluno.responsavel', 'responsavel')
            .where('aluno.id IN (:...alunosId)', { alunosId })
            .getMany();

        const responsaveis = alunosPorId
            .map(e => e.responsavel.map(x => x.email));

        const emails = [].concat.apply([], responsaveis);
        
        const tituloEmail = await (await this.configuracaoService.getByNome('titulo_envio_email_agenda')).valor;
        const conteudoEmail = await (await this.configuracaoService.getByNome('conteudo_envio_email_agenda')).valor;
        await this.emailService.enviarMultiploRecipiente(tituloEmail, conteudoEmail, emails);
    }

    public async createFromDto(dto: Array<InclusaoAgendaDto>, turmaId: number, professorId: number) {
        const agenda = new Agenda();
        
        const turma = await this.turmaRepository.findOne(turmaId);
        agenda.turma = turma;

        const interno = new Interno();
        interno.id = professorId;

        agenda.professor = interno;
        agenda.dataEscrita = new Date();
        agenda.registros = [];
        dto.forEach(e => {
            agenda.registros.push(this.criaRegistro(e));
        })

        console.log(agenda);
        await this.repository.save(agenda)
        await this.enviaEmailResponsavelAlunos(dto.map(e => e.id));
    }

    public async getAllByTurma(turmaId: number) {
        const agenda = await this.repository.createQueryBuilder('agenda')
            .innerJoinAndSelect('agenda.turma', 'turma')
            .where('agenda.turma.id = :id', { id: turmaId })
            .getMany();
        return agenda;
    }

    public async alunosPorAgenda(turmaId: number) {
        const alunos = await this.registroRepository.createQueryBuilder('registro')
            .innerJoinAndSelect('registro.aluno', 'aluno')
            .where('registro.agenda.id = :id', { id: turmaId })
            .getMany();

        return alunos;
    }

    public async atualizarRegistro(registro: Registro) {
        await this.registroRepository.save(registro);
    }

    public async agendaPorMatriculaData(matricula: string, dataInicio: string, dataFim: string) {
        return await this.repository.createQueryBuilder('agenda')
            .innerJoinAndSelect('agenda.turma', 'turma')
            .innerJoinAndSelect('agenda.professor', 'professor')
            .innerJoinAndSelect('agenda.registros', 'registro')
            .innerJoinAndSelect('registro.aluno', 'aluno')
            .where('aluno.matricula = :matricula', { matricula })
            .andWhere('agenda.dataEscrita >= :dataInicio', { dataInicio })
            .andWhere('agenda.dataEscrita <= :dataFim', { dataFim })
            .getMany();
            //  .printSql()
            //  .getMany();
    }
}
