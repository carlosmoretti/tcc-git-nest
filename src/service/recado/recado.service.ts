import { PaginateDto } from './../../dto/paginate.dto';
import { Repository } from 'typeorm/repository/Repository';
/* eslint-disable prettier/prettier */
import { Recado } from './../../model/recado.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBase } from '../service';
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

@Injectable()
export class RecadoService extends ServiceBase<Recado> {
    
    public objectToDtoPaginate(values: Recado[]): PaginateItemColumnDto {
        const res = []
        const iconeCheck = '<i class="fa fa-check" aria-hidden="true"></i>';
        const iconeTimes = '<i class="fa fa-times" aria-hidden="true"></i>';

        for(const val of values) {

            const ar = [val.id, val.aluno.nome, val.responsavel.nome, val.visualizado ? iconeCheck : iconeTimes, val.data];
            res.push(ar);
        }

        return new PaginateItemColumnDto(['ID', 'Nome', 'Responsável', 'Visualizado', 'Data'], res);
    }

    constructor(@InjectRepository(Recado) repository: Repository<Recado>) {
        super(repository);
    }

    async paginate(itensPerPage: number, page: number, keyword: string) : Promise<PaginateDto<Recado>> {
        const res = await super.paginate(itensPerPage, page, keyword);
        res.itens.results = res.itens.results.sort((a,b) => {
            const dataUm = new Date(a[4]);
            const dataDois = new Date(b[4])
            return dataDois.getTime() - dataUm.getTime();
        });

        res.itens.results.forEach(item => {
            const data = new Date(item[4]);
            item[4] = data.toLocaleString();
        });
        return res;
    }

    public async visualizar(id: number){
        const item = await this.get(id);
        item.visualizado = true;
        return await this.update(item);
    }
}
