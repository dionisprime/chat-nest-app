import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { MessageDBModule } from './message.db';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
          {
            name: 'MESSAGE_SERVICE',
            transport: Transport.REDIS,
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        ]),
        MessageDBModule,
      ],
      controllers: [MessageController],
      providers: [MessageService],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
