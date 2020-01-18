import { Test, TestingModule } from '@nestjs/testing';
import { DataDepartmentService } from './data-department.service';

describe('DataDepartmentService', () => {
  let service: DataDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataDepartmentService],
    }).compile();

    service = module.get<DataDepartmentService>(DataDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
