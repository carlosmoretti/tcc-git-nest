/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { PaginateDto } from './../dto/paginate.dto';
import { PaginateItemColumnDto } from './../dto/paginate.item.column';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class ServiceBase<T> {
    constructor(public service: Repository<T>) {}

    public abstract objectToDtoPaginate(values: T[]): PaginateItemColumnDto;

    async  create(obj: T): Promise<void> {
        await this.service.save(obj);
    }

    async createAll(obj: T[]) {
        await this.service.save(obj);
    }

    async update(obj: T): Promise<void> {
        await this.service.save(obj);
    }

    async remove(obj: number): Promise<void> {
        await this.service.delete(obj);
    }

    async removeAll(obj: number[]): Promise<void> {
        await this.service.delete(obj);
    }

    async get(id: number): Promise<T> {
        const item = await this.service.findOne(id);
        
        if(item == null)
            throw new NotFoundException()

        return item;
    }

    async paginate(itensPerPage: number, page: number, keyword: string) : Promise<PaginateDto<T>> {
        const take = itensPerPage;
        const skip = itensPerPage * (page - 1);
        const totalItens = await this.service.count();

        let [result] = await this.service.findAndCount({
            take, skip
        })

        let pageQuantity = Math.ceil(totalItens / itensPerPage);

        if(keyword != '' && keyword != null && keyword != undefined) {
            result = result.filter(e => JSON.stringify(e).toUpperCase().includes(keyword.toUpperCase()));
            pageQuantity = Math.ceil(result.length / itensPerPage);
        }

        return new PaginateDto<T>(page, itensPerPage, pageQuantity, this.objectToDtoPaginate(result));
    }

    getAll(): Promise<T[]> {
        return this.service.find();
    }
}
