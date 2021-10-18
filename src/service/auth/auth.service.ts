/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
import { TROCA_SENHA_URL } from './../../config/sendgrid.config';
import { EmailService } from './../email/email.service';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Pessoa } from 'src/model/pessoa.model';
import { Request } from 'express';
import { HttpStatus } from '@nestjs/common';
import { RoleEnum } from './../../model/enums/roles.enum';
import { ExcecaoGenerica } from './../../exceptions/excecaoGenerica.exception';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export abstract class AuthService<T extends Pessoa> {
    constructor(public service: Repository<T>, 
        public jwtService: JwtService, 
        public emailService: EmailService, 
        public historicoTrocaSenhaRepository: Repository<HistoricoTrocaSenha>,
        public tipoUsuario: string) {}

    public async validate(username: string, password: string) {
        const usuario = await this.service
            .createQueryBuilder('pess')
            .where('pess.login = :login', { login: username })
            .getOne();

        const senhaBate = await this.comparePasswords(usuario.senha, password);

        if (!senhaBate)
            throw new ExcecaoGenerica(
                'Não foi possível autenticar com este usuário e senha.',
                HttpStatus.BAD_REQUEST,
            );

        return usuario;
    }

    private async comparePasswords(senhaBanco, senhaAutenticacao) {
        const resultado = await bcrypt.compare(senhaAutenticacao, senhaBanco);
        return resultado;
    }

    public async refresh(request: Request) {
        const bearer = request.headers.authorization.split(' ')[1];
        let tokenValido;

        try {
            tokenValido = await this.jwtService.verifyAsync(bearer);
        } catch (e) {
            throw new ExcecaoGenerica(
                'Sua sessão foi expirada. Você precisa autenticar-se novamente na aplicação',
                HttpStatus.FORBIDDEN,
            );
        }

        const usuarioBusca = await this.service.findOne(tokenValido['id']);
        const payload = this.createPayload(usuarioBusca, tokenValido['role']);

        return {
            refresh_token: this.jwtService.sign(payload),
        };
    }

    private createPayload(usuario, tipoUsuario) {
        const payload = {
            username: usuario.login,
            id: usuario.id,
            role: tipoUsuario.toString(),
        };

        return payload;
    }

    public async login(login, senha, tipoUsuario: RoleEnum): Promise<any> {
        const usuario = await this.validate(login, senha);
        const payload = this.createPayload(usuario, tipoUsuario);

        return {
            token: this.jwtService.sign(payload),
        };
    }

    public async invalidaTokensExistentes(email) {
        await this.historicoTrocaSenhaRepository.createQueryBuilder()
            .where('email = :email', { email })
            .update()
            .set({ ativo: false })
            .execute();
    }

    public async redefinicaoSenha(email, nomeUsuario) {
        const token = Math.floor(100000 + Math.random() * 900000);
        const titulo = "DEFINIÇÃO DE SENHA SGBE | " + token;
        const linkTrocaSenha = TROCA_SENHA_URL;

        let curdate = new Date();
        curdate.setMinutes(curdate.getMinutes() + 30);

        let item = new HistoricoTrocaSenha();
        item.email = email;
        item.perfil = this.tipoUsuario;
        item.token = token.toString();
        item.validade = curdate;
        item.ativo = true;
        await this.invalidaTokensExistentes(email);
        let resultado = await this.historicoTrocaSenhaRepository.save(item);

        const mensagem = `Olá ${nomeUsuario}. Defina a sua senha na aplicação SGBE. 
            <br /> Para proceder com a troca de senha, clique <a href="${linkTrocaSenha}/${resultado.id}">aqui.</a>
            <br />
            <br /> Caso não consiga, cole o seguinte link do no seu navegador: ${linkTrocaSenha}/${resultado.id}
            <br /> O token para a operação é <b>${token}</b> e é válido por 30 minutos.`;

        this.emailService.enviar(titulo, mensagem, email);
    }
}
