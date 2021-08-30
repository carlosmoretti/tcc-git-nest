import { AlunoService } from './../../service/aluno/aluno.service';
import { Controller, Get } from '@nestjs/common';
import { Aluno } from '../../model/aluno.model';
import ControllerBase from '../controller';
import { Roles } from 'src/config/roles.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Public } from 'src/config/public.config';

@Controller('aluno')
@Public()
export class AlunoController extends ControllerBase<Aluno> {
    constructor(public service: AlunoService) {
        super(service);
    }
}
