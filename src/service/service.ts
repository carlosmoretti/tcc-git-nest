/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';

export abstract class ServiceBase<T> {
    constructor(public service: Repository<T>) {}

    create(obj: T): void {
        this.service.save(obj);
    }

    createAll(obj: T[]) {
        this.service.save(obj);
    }

    update(obj: T, id: number): void {
        this.service.update(id, obj);
    }

    remove(obj: number): void {
        this.service.delete(obj);
    }

    removeAll(obj: number[]): void {
        this.service.delete(obj);
    }

    get(id: number): Promise<T> {
        return this.service.findOne(id);
    }

    getAll(): Promise<T[]> {
        return this.service.find();
    }
}
