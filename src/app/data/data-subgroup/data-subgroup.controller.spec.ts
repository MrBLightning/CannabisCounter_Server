import { Test, TestingModule } from '@nestjs/testing';
import { DataSubgroupController } from './data-subgroup.controller';

describe('DataSubgroup Controller', () => {
  let controller: DataSubgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSubgroupController],
    }).compile();

    controller = module.get<DataSubgroupController>(DataSubgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
