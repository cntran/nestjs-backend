import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // fetch all users
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // Get a single user
  async getUser(userID): Promise<User> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  // post a single user
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  // Edit user details
  async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true },
    );
    return updatedUser;
  }

  // Delete a user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
