import { Test, TestingModule } from '@nestjs/testing';
import { SucursalesController } from './sucursal.controller';
import { SucursalService } from './sucursal.service';

describe('SucursalController', () => {
  let controller: SucursalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SucursalesController],
      providers: [SucursalService],
    }).compile();

    controller = module.get<SucursalesController>(SucursalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
