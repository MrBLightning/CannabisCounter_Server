import { Test, TestingModule } from '@nestjs/testing';
import { ManageSupsiryunService } from './manage-supsiryun.service';

describe('ManageSupsiryunService', () => {
  let service: ManageSupsiryunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSupsiryunService],
    }).compile();

    service = module.get<ManageSupsiryunService>(ManageSupsiryunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
