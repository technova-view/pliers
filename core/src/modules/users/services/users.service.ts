import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseApiResponse } from "src/common/interfaces/api-response.interface";
import { User } from "src/modules/database/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * Retrieve logged in user
     * @param user - User entity
     * @return User entity
     */
    async retrieveLoggedInUser(user: User): Promise<BaseApiResponse<User>> {
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return BaseApiResponse.success('User retrieved successfully', user);
    }

    /**
     * Update logged in user
     * @param updateUserDto - Update user data
     * @param user - User entity
     * @return User entity
     */
    async updateLoggedInUser(updateUserDto: UpdateUserDto, user: User): Promise<BaseApiResponse<User>> {
        const updatedUser = await this.userRepository.preload({
            id: user.id,
            ...updateUserDto,
        });

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        const savedUser = await this.userRepository.save(updatedUser);
        return BaseApiResponse.success('User updated successfully', savedUser);
    }

}