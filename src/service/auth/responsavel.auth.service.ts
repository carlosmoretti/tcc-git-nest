/* eslint-disable prettier/prettier */
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
import { EmailService } from './../email/email.service';
import { JwtService } from '@nestjs/jwt';
import { Responsavel } from './../../model/responsavel.model';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm/repository/Repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponsavelAuthService extends AuthService<Responsavel> {
    constructor(
        @InjectRepository(Responsavel)
        public repository: Repository<Responsavel>,
        public jwtService: JwtService,
        public emailService: EmailService,
        @InjectRepository(HistoricoTrocaSenha) public hitsRepository: Repository<HistoricoTrocaSenha>
    ) {
        super(repository, jwtService, emailService, hitsRepository, 'responsavel');
    }
}
