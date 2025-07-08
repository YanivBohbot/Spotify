import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create_user_dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users/users.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private userService: UsersService) {}

  @Post('Signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }
}
