import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserDBModule } from './user.db';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('UserController', () => {
  let controller: UserController;

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
      controllers: [UserController],
      providers: [UserService, ConfigService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
