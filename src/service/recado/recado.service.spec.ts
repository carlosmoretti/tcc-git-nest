import { Test, TestingModule } from '@nestjs/testing';
import { RecadoService } from './recado.service';

describe('RecadoService', () => {
  let service: RecadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecadoService],
    }).compile();

    service = module.get<RecadoService>(RecadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
