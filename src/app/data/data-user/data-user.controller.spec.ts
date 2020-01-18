import { Test, TestingModule } from '@nestjs/testing';
import { DataUserController } from './data-user.controller';

describe('DataUser Controller', () => {
  let controller: DataUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataUserController],
    }).compile();

    controller = module.get<DataUserController>(DataUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
