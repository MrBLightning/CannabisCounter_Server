import { Test, TestingModule } from '@nestjs/testing';
import { DataRbacController } from './data-rbac.controller';

describe('DataRbac Controller', () => {
  let controller: DataRbacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataRbacController],
    }).compile();

    controller = module.get<DataRbacController>(DataRbacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
