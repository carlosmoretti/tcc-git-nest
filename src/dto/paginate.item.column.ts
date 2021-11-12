/* eslint-disable prettier/prettier */
export class PaginateItemColumnDto {
    
    constructor(columns: string[], results: any[]) {
        this.columns = columns;
        this.results = results;
    }

    columns: string[];
    results: any[];
}