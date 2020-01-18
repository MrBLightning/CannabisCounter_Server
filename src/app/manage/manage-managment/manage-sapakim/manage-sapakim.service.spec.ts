import { Test, TestingModule } from '@nestjs/testing';
import { ManageSapakimService } from './manage-sapakim.service';

describe('ManageSapakimService', () => {
  let service: ManageSapakimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSapakimService],
    }).compile();

    service = module.get<ManageSapakimService>(ManageSapakimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
