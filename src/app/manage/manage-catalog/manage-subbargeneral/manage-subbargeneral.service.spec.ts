import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubbargeneralService } from './manage-subbargeneral.service';

describe('ManageSubbargeneralService', () => {
  let service: ManageSubbargeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubbargeneralService],
    }).compile();

    service = module.get<ManageSubbargeneralService>(ManageSubbargeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
