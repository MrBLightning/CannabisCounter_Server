import { Test, TestingModule } from '@nestjs/testing';
import { ManageDeconstructService } from './manage-deconstruct.service';

describe('ManageDeconstructService', () => {
  let service: ManageDeconstructService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDeconstructService],
    }).compile();

    service = module.get<ManageDeconstructService>(ManageDeconstructService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
