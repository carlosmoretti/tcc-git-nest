/* eslint-disable prettier/prettier */
import { PaginateItemColumnDto } from 'src/dto/paginate.item.column';

export class PaginateDto<T> {

    constructor(
        page: number,
        itensPerPage: number,
        totalPages: number,
        itens: PaginateItemColumnDto
    ) { 
        this.itens = itens;
        this.totalPages = totalPages;
        this.page = page;
        this.itensPerPage = itensPerPage;
    }

    page: number;
    itensPerPage: number;
    totalPages: number;
    itens: PaginateItemColumnDto;
}