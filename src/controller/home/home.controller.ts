/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { Public } from "../../config/public.config";

@Controller('home')
@Public()
export class HomeController {
    @Get('dashboard')
    async getDashboard() {
        return {
            alunosCadastrados: 120
        }
    }
}