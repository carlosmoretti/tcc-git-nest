import { ExcecaoGenerica } from './../../exceptions/excecaoGenerica.exception';
import { jwtConstants } from './../../constants';
import { Responsavel } from './../../model/responsavel.model';
/* eslint-disable prettier/prettier */
import { Interno } from './../../model/interno.model';
import { EmailService } from './../email/email.service';
import { TROCA_SENHA_URL } from './../../config/sendgrid.config';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricoTrocaSenha } from 'src/model/historicotrocasenha.model';
import { ServiceBase } from '../service';
import * as bcrypt from 'bcrypt';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class HistoricotrocasenhaService extends ServiceBase<HistoricoTrocaSenha> {
    constructor(@InjectRepository(HistoricoTrocaSenha) public repository: Repository<HistoricoTrocaSenha>, 
        @InjectRepository(Interno) public internoRepository: Repository<Interno>,
        @InjectRepository(Responsavel) public responsavelRepository: Repository<Responsavel>,
        public emailService: EmailService) {
        super(repository);
    }

    public objectToDtoPaginate(values: HistoricoTrocaSenha[]): PaginateItemColumnDto {
        throw new Error('Method not implemented.');
    }

    public async invalidaTokensExistentes(email, modulo) {
        await this.repository.createQueryBuilder()
            .where('email = :email and perfil = :perfil', { email, perfil: modulo })
            .update()
            .set({ ativo: false })
            .execute();
    }

    public async redefinicaoSenha(email, modulo) {
        const token = Math.floor(100000 + Math.random() * 900000);
        const titulo = "DEFINIÇÃO DE SENHA SGBE | " + token;
        const linkTrocaSenha = TROCA_SENHA_URL;

        const curdate = new Date();
        curdate.setMinutes(curdate.getMinutes() + 30);

        const item = new HistoricoTrocaSenha();
        item.email = email;
        item.perfil = modulo;
        item.token = token.toString();
        item.validade = curdate;
        item.ativo = true;
        await this.invalidaTokensExistentes(email, modulo);
        const resultado = await this.repository.save(item);

        const mensagem = `Olá ${email}. Defina a sua senha na aplicação SGBE. 
            <br /> Para proceder com a troca de senha, clique <a href="${linkTrocaSenha}/${resultado.id}">aqui.</a>
            <br />
            <br /> Caso não consiga, cole o seguinte link do no seu navegador: ${linkTrocaSenha}/${resultado.id}
            <br /> O token para a operação é <b>${token}</b> e é válido por 30 minutos.`;

        this.emailService.enviar(titulo, mensagem, email);
    }

    public async defineSenha(id, item: any) {

        const itemTrocaSenhaBanco = await this.repository.findOne(id);

        if(item.senha.length < 8)
            throw new ExcecaoGenerica('A senha deve conter pelo menos 8 caracteres.', HttpStatus.BAD_REQUEST);

        if(item.senha != item.confirmaSenha)
            throw new ExcecaoGenerica('A confirmação de senha precisa ser igual a senha informada.', HttpStatus.BAD_REQUEST);

        if(item.token != itemTrocaSenhaBanco.token)
            throw new ExcecaoGenerica('Token inválido para esta operação.', HttpStatus.BAD_REQUEST);

        if(new Date() > itemTrocaSenhaBanco.validade)
            throw new ExcecaoGenerica('O prazo para a troca de senha expirou. Gere um novo token para prosseguir.', HttpStatus.BAD_REQUEST);

        console.log(item.senha)
        const senhabcrypt = await bcrypt.hash(item.senha, jwtConstants.bcrypt_salts);

        switch(itemTrocaSenhaBanco.perfil) {
            case 'interno':
                await this.internoRepository
                    .createQueryBuilder()
                    .where('email = :email', { email: itemTrocaSenhaBanco.email })
                    .update()
                    .set({ senha: senhabcrypt })
                    .execute();
                    break;
            case 'responsavel':
                await this.responsavelRepository
                    .createQueryBuilder()
                    .where('email = :email', { email: itemTrocaSenhaBanco.email })
                    .update()
                    .set({ senha: senhabcrypt })
                    .execute();
                    break;
        }

        return itemTrocaSenhaBanco.perfil;
    }
}
