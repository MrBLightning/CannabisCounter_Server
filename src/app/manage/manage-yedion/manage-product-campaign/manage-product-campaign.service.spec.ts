import { Test, TestingModule } from '@nestjs/testing';
import { ManageProductCampaignService } from './manage-product-campaign.service';

describe('ManageProductCampaignService', () => {
  let service: ManageProductCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageProductCampaignService],
    }).compile();

    service = module.get<ManageProductCampaignService>(ManageProductCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
