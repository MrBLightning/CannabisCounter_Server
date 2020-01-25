import { Test, TestingModule } from '@nestjs/testing';
import { ManageProductCampaignController } from './manage-product-campaign.controller';

describe('ManageProductCampaignController', () => {
  let controller: ManageProductCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageProductCampaignController],
    }).compile();

    controller = module.get<ManageProductCampaignController>(ManageProductCampaignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
