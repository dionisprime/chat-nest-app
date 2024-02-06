import { Test } from '@nestjs/testing';
import { PollingGateway } from './polling.gateway';
import { PollingService } from './polling.service';
import { Socket, io } from 'socket.io-client';
import { RedisModule } from '../redis.module';
import { INestApplication } from '@nestjs/common';

describe('PollingGateway', () => {
  let gateway: PollingGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [PollingGateway, PollingService],
    }).compile();

    gateway = testingModule.get<PollingGateway>(PollingGateway);

    ioClient = io('ws://localhost:3001', {
      autoConnect: false,
      transports: ['websocket'],
    });

    app = await testingModule.createNestApplication();
    app.listen(3001);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit -pong', async () => {
    ioClient.connect();

    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        ioClient.emit('ping');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('pong data');
        resolve();
      });
    });
    ioClient.disconnect();
  });
});
