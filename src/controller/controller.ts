/* eslint-disable prettier/prettier */
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceBase } from '../service/service';

export default abstract class ControllerBase<T> {
    constructor(public service: ServiceBase<T>) {}

    @Get()
    public getAll(): Promise<T[]> {
        return this.service.getAll();
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.service.get(id);
    }

    @Post()
    post(@Body() param: T) {
        return this.service.create(param);
    }

    @Put(':id')
    put(@Param('id') id: number, @Body() obj: T) {
        return this.service.update(obj, id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
