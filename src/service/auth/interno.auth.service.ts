/* eslint-disable prettier/prettier */
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
    ) {
        super(repository, jwtService);
    }
}
