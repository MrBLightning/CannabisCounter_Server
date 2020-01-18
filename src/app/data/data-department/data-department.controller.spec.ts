import { Test, TestingModule } from '@nestjs/testing';
import { DataDepartmentController } from './data-department.controller';

describe('DataClass Controller', () => {
  let controller: DataDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataDepartmentController],
    }).compile();

    controller = module.get<DataDepartmentController>(DataDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
