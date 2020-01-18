import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubtitleService } from './manage-subtitle.service';

describe('ManageSubtitleService', () => {
  let service: ManageSubtitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubtitleService],
    }).compile();

    service = module.get<ManageSubtitleService>(ManageSubtitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
