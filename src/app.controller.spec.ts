import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
          {
            name: 'CHAT_SERVICE',
            transport: Transport.REDIS,
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should return user by id', async () => {
    const id = 'userId';
    const result = 'test' as any;
    jest.spyOn(appService, 'getUserById').mockImplementation(() => result);
    expect(await appController.getUserById(id)).toBe(result);
  });

  it('should return chat by id', async () => {
    const id = 'userId';
    const result = 'test' as any;
    jest.spyOn(appService, 'getChatById').mockImplementation(() => result);
    expect(await appController.getChatById(id)).toBe(result);
  });

  it('should return message by id', async () => {
    const id = 'userId';
    const result = 'test' as any;
    jest.spyOn(appService, 'getMessageById').mockImplementation(() => result);
    expect(await appController.getMessageById(id)).toBe(result);
  });

  it('should return message by id', async () => {
    const id = 'userId';
    const result = 'test' as any;
    jest.spyOn(appService, 'getMessageById').mockImplementation(() => result);
    expect(await appController.getMessageById(id)).toBe(result);
  });
});
