/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    async usuariosMensalDashboard(mes: number) {
        const dt = new Date();
        const month = dt.getMonth() + 1;
        const year = dt.getFullYear();


    }
}
