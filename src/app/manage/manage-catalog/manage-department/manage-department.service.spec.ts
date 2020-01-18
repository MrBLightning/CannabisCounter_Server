import { Test, TestingModule } from '@nestjs/testing';
import { ManageDepartmentService } from './manage-department.service';

describe('ManageDepartmentService', () => {
  let service: ManageDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageDepartmentService],
    }).compile();

    service = module.get<ManageDepartmentService>(ManageDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
