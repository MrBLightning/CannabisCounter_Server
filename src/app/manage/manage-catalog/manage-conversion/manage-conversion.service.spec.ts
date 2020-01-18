import { Test, TestingModule } from '@nestjs/testing';
import { ManageConversionService } from './manage-conversion.service';

describe('ManageConversionService', () => {
  let service: ManageConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageConversionService],
    }).compile();

    service = module.get<ManageConversionService>(ManageConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
