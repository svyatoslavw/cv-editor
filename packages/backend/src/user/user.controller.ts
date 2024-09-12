import { Auth } from "@/auth/decorators/auth.decorator"
import { CurrentUser } from "@/auth/decorators/user.decorator"
import { Controller, Get } from "@nestjs/common"
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { UserType } from "./entities/user.entity"
import { UserService } from "./user.service"

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll()
  }

  @ApiResponse({ status: 200, type: UserType })
  @ApiParam({ name: "id", type: String, description: "user id" })
  @Get("profile")
  @Auth()
  async profile(@CurrentUser("id") id: string) {
    return this.userService.getById(id)
  }
}
