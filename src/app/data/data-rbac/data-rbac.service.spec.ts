import { Test, TestingModule } from '@nestjs/testing';
import { DataRbacService } from './data-rbac.service';

describe('DataRbacService', () => {
  let service: DataRbacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataRbacService],
    }).compile();

    service = module.get<DataRbacService>(DataRbacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
