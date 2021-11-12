/* eslint-disable @typescript-eslint/no-empty-function */
import { AlunoService } from './../aluno/aluno.service';
import { HistoricotrocasenhaService } from 'src/service/historicotrocasenha/historicotrocasenha.service';
import { ExcecaoGenerica } from './../../exceptions/excecaoGenerica.exception';
import { Responsavel } from './../../model/responsavel.model';
import { MensagensConst } from './../../mensagem.const';
import { jwtConstants } from './../../constants';
/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { ServiceBase } from '../service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class ResponsavelService extends ServiceBase<Responsavel> {
    constructor(
        private whatsappService: WhatsAppService,
        @InjectRepository(Responsavel)
        public repository: Repository<Responsavel>,
        public historicoSenhaService: HistoricotrocasenhaService,
        public alunoService: AlunoService
    ) {
        super(repository);
    }

    public objectToDtoPaginate(values: Responsavel[]): PaginateItemColumnDto {
        const valores: any[] = [];

        values.forEach(e => {
            const temp = [e.id, e.nome, e.sobrenome, e.matricula];
            valores.push(temp);
        });
        
        return new PaginateItemColumnDto(['ID', 'Nome', 'Sobrenome', 'Matrícula'], valores);
    }

    async defineDataInclusaoNovosAlunos(obj: Responsavel) {
        if(obj.alunos != null) {
            obj.alunos.forEach(e => {
                if(e.id == null)
                    e.dataInclusao = new Date();
            })
        }
    }

    async create(resp: Responsavel) {
        await this.defineDataInclusaoNovosAlunos(resp);
        await this.verificaMatriculaDisponivel(resp.matricula);
        resp.senha = jwtConstants.senhaPendente;
        resp.senha = await bcrypt.hash(resp.senha, jwtConstants.bcrypt_salts);
        await this.whatsappService.enviar("+5521969416765", MensagensConst.confirmacaoCriacaoContaWhatsApp);
        resp.dataInclusao = new Date();

        super.create(resp);
        this.historicoSenhaService.redefinicaoSenha(resp.email, 'responsavel');
    }

    async update(obj: Responsavel) {
        await this.defineDataInclusaoNovosAlunos(obj);
        // obj.senha = await bcrypt.hash(obj.senha, jwtConstants.bcrypt_salts);
        super.update(obj);
    }

    async verificaMatriculaDisponivel(matricula) {
        const item = await this.service
            .createQueryBuilder('pess')
            .where('pess.matricula = :matricula', { matricula })
            .getOne();

        if(item != null)
            throw new ExcecaoGenerica('Já existe um usuário cadastrado com essa matricula.', HttpStatus.BAD_REQUEST);
    }
}
