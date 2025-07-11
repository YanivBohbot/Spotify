import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create_user_dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users/users.service';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from '../dto/LoginDTO';
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
  ) {}
  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
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
}
