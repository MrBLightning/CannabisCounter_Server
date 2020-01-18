import { Test, TestingModule } from '@nestjs/testing';
import { ManageSibasController } from './manage-sibas.controller';

describe('ManageSibas Controller', () => {
  let controller: ManageSibasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSibasController],
    }).compile();

    controller = module.get<ManageSibasController>(ManageSibasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
