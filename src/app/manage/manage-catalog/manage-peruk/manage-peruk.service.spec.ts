import { Test, TestingModule } from '@nestjs/testing';
import { ManagePerukService } from './manage-peruk.service';

describe('ManagePerukService', () => {
  let service: ManagePerukService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagePerukService],
    }).compile();

    service = module.get<ManagePerukService>(ManagePerukService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
