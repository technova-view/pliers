import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { BaseApiResponse } from "../../../common/interfaces/api-response.interface";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "../services/users.service";
import { User } from "src/modules/database/entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Get('me')
    @ApiBearerAuth()
    async retrieveLoggedInUser(@Req() @CurrentUser() user: User): Promise<BaseApiResponse<User>> {
        return this.userService.retrieveLoggedInUser(user);
    }

    @Post('me')
    @ApiBearerAuth()
    async updateLoggedInUser(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User): Promise<BaseApiResponse<User>> {
        return this.userService.updateLoggedInUser(updateUserDto, user);
    }
}
