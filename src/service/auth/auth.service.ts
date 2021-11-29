import { InternoService } from './../interno/interno.service';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
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
            .innerJoinAndSelect('pess.nivel', 'nivel')
            .where('pess.login = :login', { login: username })
            .getOne();

        if(usuario == null)
            throw new ExcecaoGenerica('Não encontramos nenhum usuário com estas credenciais.', HttpStatus.BAD_REQUEST);

        const senhaBate = await this.comparePasswords(usuario.senha, password);

        if (!senhaBate)
            throw new ExcecaoGenerica(
                'Não foi possível autenticar com este usuário e senha.',
                HttpStatus.BAD_REQUEST,
            );

        return usuario;
    }

    public getByToken(token: string) : any {
        return this.jwtService.decode(token);
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
                HttpStatus.UNAUTHORIZED,
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
            nivel: usuario.nivel.id
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
}
