import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import { chatId, defaultNameOfChat } from './helpers/chat.fixtures';
import { RedisModule } from '../redis.module';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteChatByTitle(defaultNameOfChat);
  });

  it('should return all chats', async () => {
    const chats = await service.findAll();
    expect(chats).toBeInstanceOf(Array);
  });

  it('should remove chat by id', async () => {
    const chat = chatId;
    const result = await service.remove(chat);
    expect(result).toBeDefined();
  });
});
