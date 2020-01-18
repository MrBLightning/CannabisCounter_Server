import { Test, TestingModule } from '@nestjs/testing';
import { ManageYedtzService } from './manage-yedtz.service';

describe('ManageYedtzService', () => {
  let service: ManageYedtzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageYedtzService],
    }).compile();

    service = module.get<ManageYedtzService>(ManageYedtzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
