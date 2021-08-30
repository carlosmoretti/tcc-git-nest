/* eslint-disable prettier/prettier */
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
    ) {
        super(repository, jwtService);
    }
}
