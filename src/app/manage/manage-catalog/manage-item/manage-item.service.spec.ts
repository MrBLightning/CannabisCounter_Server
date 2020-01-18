import { Test, TestingModule } from '@nestjs/testing';
import { ManageItemService } from './manage-item.service';

describe('ManageItemService', () => {
  let service: ManageItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageItemService],
    }).compile();

    service = module.get<ManageItemService>(ManageItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
