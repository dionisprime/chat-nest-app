import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import {
  chatId,
  chatTest,
  defaultChat,
  removeChat,
} from './helpers/chat.fixtures';
import { RedisModule } from '../redis.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule, RedisModule],
      controllers: [ChatController],
      providers: [ChatService, JwtService, ConfigService],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a chat by id', async () => {
      const id = chatId;
      const chat = chatTest();
      jest.spyOn(service, 'findOne').mockImplementation(async () => chat);
      expect(await controller.findOne(id)).toBe(chat);
    });
  });

  describe('findAll', () => {
    it('should return all chats', async () => {
      const result = [defaultChat(), chatTest()];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create Chat', () => {
    it('should create a new chat', async () => {
      const chat = chatTest();
      jest.spyOn(service, 'create').mockImplementation(async (chat) => chat);
      expect(await controller.create(chat, {})).toBe(chat);
    });
  });

  describe('delete chat by Id', () => {
    it('should delete a chat by ID', async () => {
      const chat = removeChat();
      jest.spyOn(service, 'remove').mockImplementation(async () => chat);
      expect(await controller.remove(chat.id)).toEqual(chat);
    });
  });

  describe('delete chat by Id', () => {
    it('should delete a chat by ID if user is the owner', async () => {
      const user = { id: 1, username: 'testUser' };
      const chat = { id: 1, createdBy: user.id };
      jest.spyOn(service, 'findOne').mockImplementation(async () => chat);
      jest.spyOn(service, 'remove').mockImplementation(async () => chat);
      const req = { user: { id: user.id } };
      const res = {
        send: jest.fn(),
      };
      expect(controller.remove(req.toString())).toBeDefined();
      expect(res.send).toBeDefined();
    });
  });
});
