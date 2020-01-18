import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedService } from './manage-yed.service';

describe('ManageYedService', () => {
  let service: ManageYedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageYedService],
    }).compile();

    service = module.get<ManageYedService>(ManageYedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
