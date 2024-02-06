import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import {
  chatId,
  chatTest,
  defaultChat,
  defaultNameOfChat,
  updateChat,
} from './helpers/chat.fixtures';

describe('ChatService', () => {
  let service: ChatService;

  async function createChatAndGetId(chatDto = defaultChat()) {
    const createdChat = await service.create(chatDto);
    return createdChat._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule],
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should created a chat', async () => {
    const createChatDto = defaultChat();
    const createChat = await service.create(createChatDto);
    expect(createChat).toBeDefined();
    expect(createChat.title).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteChatByTitle(defaultNameOfChat);
  });

  it('should return all chats', async () => {
    const chats = await service.findAll();
    expect(chats).toBeInstanceOf(Array);
  });

  it('should return a chat by id', async () => {
    const chatDto = defaultChat();
    const chatById = await createChatAndGetId(chatDto);
    const result = await service.findOne(chatById);
    expect(result).toBeDefined();
  });

  it('should update chat by id', async () => {
    const chatDto = chatTest();
    const chatById = await createChatAndGetId(chatDto);
    const chat = await service.update(chatById, updateChat());
    expect(chat.title).toBeTruthy();
  });

  it('should remove chat by id', async () => {
    const chat = chatId;
    const result = await service.remove(chat);
    expect(result).toBeDefined();
  });
});
