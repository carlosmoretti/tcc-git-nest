import { InternoService } from './../../service/interno/interno.service';
import { Controller } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { InternoAuthService } from 'src/service/auth/interno.auth.service';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';
import { RoleEnum } from 'src/model/enums/roles.enum';
import { Roles } from 'src/config/roles.config';

@Controller('interno')
@Public()
export class InternoController extends ControllerBase<Interno> {
    constructor(public service: InternoService) {
        super(service);
    }
}
