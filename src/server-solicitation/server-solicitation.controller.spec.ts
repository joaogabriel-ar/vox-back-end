import { Test, TestingModule } from '@nestjs/testing';
import { ServerSolicitationController } from './server-solicitation.controller';
import { ServerSolicitationService } from './server-solicitation.service';

describe('ServerSolicitationController', () => {
  let controller: ServerSolicitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerSolicitationController],
      providers: [ServerSolicitationService],
    }).compile();

    controller = module.get<ServerSolicitationController>(ServerSolicitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
