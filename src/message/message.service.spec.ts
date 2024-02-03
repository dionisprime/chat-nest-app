import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageDBModule } from './message.db';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from './message.schema';

const fakeMessageInfo = {
  createdBy: '65a3dfc33572e05150cb7805',
  text: 'Lorem ipsum dolor',
  date: '1705309971834',
};

describe('MessageService', () => {
  let service: MessageService;
  const mockMessageModel = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

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
      providers: [
        MessageService,
        {
          provide: getModelToken(Message.name),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new message', async () => {
    const messageInfo = fakeMessageInfo as CreateMessageDto;
    const message = {
      _id: 'messageId',
      ...messageInfo,
    } as any;
    mockMessageModel.create.mockReturnValue(message);
    const result = await mockMessageModel.create(messageInfo);
    expect(result).toEqual(message);
    expect(mockMessageModel.create).toHaveBeenCalledWith(messageInfo);
  });

  it('should update message by id', async () => {
    const messageId = 'messageId';
    const newMessageInfo = fakeMessageInfo as UpdateMessageDto;
    const message = {
      _id: messageId,
      ...newMessageInfo,
    } as any;
    mockMessageModel.update.mockReturnValue(message);
    const result = await mockMessageModel.update(messageId, newMessageInfo);
    expect(result).toEqual(message);
    expect(mockMessageModel.update).toHaveBeenCalledWith(
      messageId,
      newMessageInfo,
    );
  });

  it('should delete message by id', async () => {
    const messageId = 'messageId';
    const message = {
      _id: messageId,
      ...fakeMessageInfo,
    } as any;
    mockMessageModel.remove.mockReturnValue(message);
    const result = await mockMessageModel.remove(messageId);
    expect(result).toEqual(message);
    expect(mockMessageModel.remove).toHaveBeenCalledWith(messageId);
  });

  it('should get message by id', async () => {
    const messageId = 'messageId';
    const message = {
      _id: messageId,
      ...fakeMessageInfo,
    } as any;
    mockMessageModel.findOne.mockReturnValue(message);
    const result = await mockMessageModel.findOne(messageId);
    expect(result).toEqual(message);
    expect(mockMessageModel.findOne).toHaveBeenCalledWith(messageId);
  });

  it('should get message by id', async () => {
    const messageId = 'messageId';
    const messages = [
      {
        _id: messageId,
        ...fakeMessageInfo,
      },
    ] as any[];
    mockMessageModel.findAll.mockReturnValue(messages);
    const result = await mockMessageModel.findAll();
    expect(result).toEqual(messages);
  });
});
