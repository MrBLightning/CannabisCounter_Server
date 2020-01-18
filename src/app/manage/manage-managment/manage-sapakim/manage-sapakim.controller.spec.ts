import { Test, TestingModule } from '@nestjs/testing';
import { ManageSapakimController } from './manage-sapakim.controller';

describe('ManageSapakim Controller', () => {
  let controller: ManageSapakimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSapakimController],
    }).compile();

    controller = module.get<ManageSapakimController>(ManageSapakimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
