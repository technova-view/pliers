import { Body, Controller, Get, Post, Req, Query, Put, Param, UseGuards } from "@nestjs/common";
import { BaseApiResponse } from "../../../common/interfaces/api-response.interface";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UsersService } from "../services/users.service";
import { User } from "src/modules/database/entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AdminUserQueryDto } from "../dto/admin-user-query.dto";
import { UpdateUserStatusDto } from "../dto/update-user-status.dto";
import { AdminGuard } from "../../auth/guards/admin.guard";

@ApiTags('Users')
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

    @Get('admin/all')
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get all users with pagination and filtering (Admin only)' })
    async getAllUsers(@Query() query: AdminUserQueryDto): Promise<BaseApiResponse<any>> {
        return this.userService.getAllUsers(query);
    }

    @Put('admin/status')
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update user status (Admin only)' })
    async updateUserStatus(@Body() updateUserStatusDto: UpdateUserStatusDto): Promise<BaseApiResponse<User>> {
        return this.userService.updateUserStatus(updateUserStatusDto.userId, updateUserStatusDto.status);
    }
}
