import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UsersModule } from 'src/users/users/users.module';
import { JwtStrategy } from './authentication/jwt-strategy';
import { authConstants } from './authentication/auth.contant';
import { JwtModule } from '@nestjs/jwt';
import { ArtistModule } from 'src/artist/artist.module';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ArtistModule,
  ],
  exports: [AuthenticationService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthModule {}
