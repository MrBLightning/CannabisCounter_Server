import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedionService } from './manage-yedion.service';

describe('ManageYedionService', () => {
  let service: ManageYedionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageYedionService],
    }).compile();

    service = module.get<ManageYedionService>(ManageYedionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
