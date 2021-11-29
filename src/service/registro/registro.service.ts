/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm/repository/Repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';
import { Registro } from 'src/model/registro.model';
import { ServiceBase } from '../service';

@Injectable()
export class RegistroService extends ServiceBase<Registro> {
    public objectToDtoPaginate(values: Registro[]): PaginateItemColumnDto {
        throw new Error('Method not implemented.');
    }

    constructor(@InjectRepository(Registro) public registroRepository: Repository<Registro>) {
        super(registroRepository);
    }
}
