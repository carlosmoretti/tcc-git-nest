import { TurmaService } from './../../service/turma/turma.service';
import { Controller } from '@nestjs/common';
import { Turma } from 'src/model/turma.model';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';

@Controller('turma')
@Public()
export class TurmaController extends ControllerBase<Turma> {
    constructor(public service: TurmaService) {
        super(service);
    }
}
