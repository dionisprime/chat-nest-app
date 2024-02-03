import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserDBModule } from './user.db';
import { User } from './user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const fakeUserInfo = {
  username: 'User',
  nickname: 'Nick',
  email: 'email@test.com',
  roles: ['user'],
  password: '1111',
};

describe('UserService', () => {
  let service: UserService;

  const mockUserModel = {
    findById: jest.fn(),
    find: jest.fn(),
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
            name: 'USER_SERVICE',
            transport: Transport.REDIS,
            options: {
              host: 'localhost',
              port: 6379,
            },
          },
        ]),
        UserDBModule,
      ],
      providers: [
        UserService,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userInfo = fakeUserInfo as CreateUserDto;
    const user = {
      _id: 'userId',
      ...userInfo,
    } as any;
    mockUserModel.create.mockReturnValue(user);
    const result = await mockUserModel.create(userInfo);
    expect(result).toEqual(user);
    expect(mockUserModel.create).toHaveBeenCalledWith(userInfo);
  });

  it('should update user by id', async () => {
    const userId = 'userId';
    const newUserInfo = fakeUserInfo as UpdateUserDto;
    const user = {
      _id: userId,
      ...newUserInfo,
    } as any;
    mockUserModel.update.mockReturnValue(user);
    const result = await mockUserModel.update(userId, newUserInfo);
    expect(result).toEqual(user);
    expect(mockUserModel.update).toHaveBeenCalledWith(userId, newUserInfo);
  });

  it('should delete user by id', async () => {
    const userId = 'userId';
    const user = {
      _id: userId,
      ...fakeUserInfo,
    } as any;
    mockUserModel.remove.mockReturnValue(user);
    const result = await mockUserModel.remove(userId);
    expect(result).toEqual(user);
    expect(mockUserModel.remove).toHaveBeenCalledWith(userId);
  });

  it('should get user by id', async () => {
    const userId = 'userId';
    const user = {
      _id: userId,
      ...fakeUserInfo,
    } as any;
    mockUserModel.findById.mockReturnValue(user);
    const result = await mockUserModel.findById(userId);
    expect(result).toEqual(user);
    expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
  });

  it('should get user by id', async () => {
    const userId = 'userId';
    const users = [
      {
        _id: userId,
        ...fakeUserInfo,
      },
    ] as any[];
    mockUserModel.find.mockReturnValue(users);
    const result = await mockUserModel.find();
    expect(result).toEqual(users);
  });
});
