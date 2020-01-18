import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedmivService } from './manage-yedmiv.service';

describe('ManageYedmivService', () => {
  let service: ManageYedmivService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageYedmivService],
    }).compile();

    service = module.get<ManageYedmivService>(ManageYedmivService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
