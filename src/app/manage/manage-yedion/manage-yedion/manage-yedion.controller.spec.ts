import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedionController } from './manage-yedion.controller';

describe('ManageYedionController', () => {
  let controller: ManageYedionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageYedionController],
    }).compile();

    controller = module.get<ManageYedionController>(ManageYedionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
