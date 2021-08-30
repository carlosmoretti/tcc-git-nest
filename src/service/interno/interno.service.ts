import { Repository } from 'typeorm';
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { ServiceBase } from '../service';

@Injectable()
export class InternoService extends ServiceBase<Interno> {
    constructor(@InjectRepository(Interno) public repository: Repository<Interno>) {
        super(repository);
    }
}
