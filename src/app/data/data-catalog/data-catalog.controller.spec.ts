import { Test, TestingModule } from '@nestjs/testing';
import { DataCatalogController } from './data-catalog.controller';

describe('DataCatalog Controller', () => {
  let controller: DataCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCatalogController],
    }).compile();

    controller = module.get<DataCatalogController>(DataCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
