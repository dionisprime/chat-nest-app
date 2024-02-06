import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private userModel;
  constructor(
    @InjectConnection('user') private readonly connection: Connection,
  ) {
    this.userModel = this.connection.model<UserDocument>(User.name);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async deleteUserByName(name: string) {
    return await this.userModel.deleteMany({ name });
  }
}
