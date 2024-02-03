import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

describe('AppController', () => {
  let appService: AppService;
  let chatClientMock: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'CHAT_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    chatClientMock = module.get('CHAT_SERVICE');
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should send createUser request to chatClient', async () => {
    const userInfo = 'test' as any;
    const user = 'Test User' as any;
    chatClientMock.send.mockImplementation(() => user);
    const result = await appService.postUser(userInfo);
    expect(result).toEqual(user);
    expect(chatClientMock.send).toHaveBeenCalledWith(
      { cmd: 'createUser' },
      userInfo,
    );
  });

  it('should send getUser request to chatClient', async () => {
    const fakeId = '123' as any;
    const user = 'Test User' as any;
    chatClientMock.send.mockImplementation(() => user);
    const result = await appService.getUserById(fakeId);
    expect(result).toEqual(user);
    expect(chatClientMock.send).toHaveBeenCalledWith(
      { cmd: 'getUser' },
      fakeId,
    );
  });

  it('should send getMessage request to chatClient', async () => {
    const fakeId = '123' as any;
    const message = 'Test Message' as any;
    chatClientMock.send.mockImplementation(() => message);
    const result = await appService.getMessageById(fakeId);
    expect(result).toEqual(message);
    expect(chatClientMock.send).toHaveBeenCalledWith(
      { cmd: 'getMessage' },
      fakeId,
    );
  });
});
