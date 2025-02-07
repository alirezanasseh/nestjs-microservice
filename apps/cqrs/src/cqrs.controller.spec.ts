import { Test, TestingModule } from '@nestjs/testing';
import { CqrsController } from './cqrs.controller';
import { CqrsService } from './cqrs.service';

describe('CqrsController', () => {
  let cqrsController: CqrsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CqrsController],
      providers: [CqrsService],
    }).compile();

    cqrsController = app.get<CqrsController>(CqrsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cqrsController.getHello()).toBe('Hello World!');
    });
  });
});
