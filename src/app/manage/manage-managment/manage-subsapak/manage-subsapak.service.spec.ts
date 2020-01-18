import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubsapakService } from './manage-subsapak.service';

describe('ManageSubsapakService', () => {
  let service: ManageSubsapakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubsapakService],
    }).compile();

    service = module.get<ManageSubsapakService>(ManageSubsapakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
