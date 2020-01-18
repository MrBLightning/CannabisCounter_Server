import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedController } from './manage-yed.controller';

describe('ManageYedController', () => {
  let controller: ManageYedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageYedController],
    }).compile();

    controller = module.get<ManageYedController>(ManageYedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
