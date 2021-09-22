/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export abstract class ServiceBase<T> {
    constructor(public service: Repository<T>) {}

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

    getAll(): Promise<T[]> {
        return this.service.find();
    }
}
