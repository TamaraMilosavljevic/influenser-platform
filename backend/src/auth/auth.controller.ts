import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Credentials } from "./dto/credentials.dto";
import { Public } from "./public.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({
      summary: 'Login an existing influencer',
      description:
        'This endpoint allows an existing influencer to log in with their credentials.',
  })
  login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }
}
