import { Test, TestingModule } from '@nestjs/testing';
import { ManageDepartmentController } from './manage-department.controller';

describe('ManageDepartment Controller', () => {
  let controller: ManageDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageDepartmentController],
    }).compile();

    controller = module.get<ManageDepartmentController>(ManageDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
