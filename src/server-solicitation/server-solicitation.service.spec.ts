import { Test, TestingModule } from '@nestjs/testing';
import { ServerSolicitationService } from './server-solicitation.service';

describe('ServerSolicitationService', () => {
  let service: ServerSolicitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerSolicitationService],
    }).compile();

    service = module.get<ServerSolicitationService>(ServerSolicitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
