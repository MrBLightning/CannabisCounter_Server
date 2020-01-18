import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubbarService } from './manage-subbar.service';

describe('ManageSubbarService', () => {
  let service: ManageSubbarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubbarService],
    }).compile();

    service = module.get<ManageSubbarService>(ManageSubbarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
