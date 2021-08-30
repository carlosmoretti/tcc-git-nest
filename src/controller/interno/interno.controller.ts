import { InternoService } from './../../service/interno/interno.service';
import { Controller } from '@nestjs/common';
import { Interno } from 'src/model/interno.model';
import { InternoAuthService } from 'src/service/auth/interno.auth.service';
import ControllerBase from '../controller';
import { Public } from 'src/config/public.config';

@Controller('interno')
@Public()
export class InternoController extends ControllerBase<Interno> {
    constructor(public service: InternoService) {
        super(service);
    }
}
