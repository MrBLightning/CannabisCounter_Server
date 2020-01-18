import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedtzController } from './manage-yedtz.controller';

describe('ManageYedtzController', () => {
  let controller: ManageYedtzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageYedtzController],
    }).compile();

    controller = module.get<ManageYedtzController>(ManageYedtzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
