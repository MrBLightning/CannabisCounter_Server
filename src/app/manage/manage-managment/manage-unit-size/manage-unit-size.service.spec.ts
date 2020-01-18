import { Test, TestingModule } from '@nestjs/testing';
import { ManageUnitSizeService } from './manage-unit-size.service';

describe('ManageUnitSizeService', () => {
  let service: ManageUnitSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageUnitSizeService],
    }).compile();

    service = module.get<ManageUnitSizeService>(ManageUnitSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
