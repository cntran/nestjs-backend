import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  // add a user
  @Post('/')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    try {
      const user = await this.userService.addUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
        message: 'User has been created successfully',
        user,
      });
    } catch (err) {
      const { message } = err;
      throw new UnprocessableEntityException(message);
    }
  }

  // Fetch a particular user using ID
  @Get('/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  // Update a user's details
  @Put('/:userID')
  async updateUser(
    @Res() res,
    @Param('userID') userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const user = await this.userService.updateUser(userID, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  // Delete a user
  @Delete('/:userID')
  async deleteUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
