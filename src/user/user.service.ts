import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  private readonly userModel;

  constructor(@InjectConnection('users') private connection: Connection) {
    this.userModel = this.connection.model<UserDocument>(User.name);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await new this.userModel(createUserDto).save();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(`User with ${id} not found`);
    } else {
      return user;
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(`User with ${id} not found`);
    }
    user?.set(updateUserDto);
    return user?.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error(`User with ${id} not found`);
    }
    return user;
  }
}
