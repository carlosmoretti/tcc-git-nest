/* eslint-disable prettier/prettier */
import { HistoricoTrocaSenha } from './../../model/historicotrocasenha.model';
import { EmailService } from './../email/email.service';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interno } from 'src/model/interno.model';
import { AuthService } from './auth.service';

@Injectable()
export class InternoAuthService extends AuthService<Interno> {
    constructor(
        @InjectRepository(Interno) public repository: Repository<Interno>,
        public jwtService: JwtService,
        public emailService: EmailService,
        @InjectRepository(HistoricoTrocaSenha) public hitsRepository: Repository<HistoricoTrocaSenha>
    ) {
        super(repository, jwtService, emailService, hitsRepository, 'interno');
    }
}
