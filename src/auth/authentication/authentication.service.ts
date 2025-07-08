import { Injectable } from '@nestjs/common';

import { LoginDTO } from '../dto/LoginDTO';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO); // 1.

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    ); // 2.

    if (passwordMatched) {
      //3
      delete user.password; // 4.
      return user;
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }
}
