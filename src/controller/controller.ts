/* eslint-disable prettier/prettier */
import { PaginateItemColumnDto } from './../dto/paginate.item.column';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ServiceBase } from '../service/service';

export default abstract class ControllerBase<T> {
    constructor(public service: ServiceBase<T>) {}

    @Get()
    public async getAll(): Promise<T[]> {
        return await this.service.getAll();
    }

    @Get('/paginate')
    async paginate(@Query('itensPerPage') itensPerPage: number, 
        @Query('page') page: number,
        @Query('keyword') keyword: string) {
        return await this.service.paginate(itensPerPage, page, keyword);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        const item = await this.service.get(id);
        return item;
    }

    @Post()
    async post(@Body() param: T) {
        return await this.service.create(param);
    }

    @Put()
    async put(@Body() obj: T) {
        return await this.service.update(obj);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.service.remove(id);
    }
}
