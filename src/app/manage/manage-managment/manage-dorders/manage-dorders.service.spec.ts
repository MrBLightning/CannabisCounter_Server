import { Test, TestingModule } from '@nestjs/testing';
import { ManageDordersService } from './manage-dorders.service';

describe('ManageDordersService', () => {
  let service: ManageDordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDordersService],
    }).compile();

    service = module.get<ManageDordersService>(ManageDordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
