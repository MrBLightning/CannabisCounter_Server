import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedmivController } from './manage-yedmiv.controller';

describe('ManageYedmivController', () => {
  let controller: ManageYedmivController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageYedmivController],
    }).compile();

    controller = module.get<ManageYedmivController>(ManageYedmivController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
