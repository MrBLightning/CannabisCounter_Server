import { Test, TestingModule } from '@nestjs/testing';
import { ManageSubSuppliersService } from './manage-subsuppliers.service';
         
describe('ManageSubSuppliersService', () => {
  let service: ManageSubSuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSubSuppliersService],
    }).compile();

    service = module.get<ManageSubSuppliersService>(ManageSubSuppliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
