import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseApiResponse, PaginatedResponse } from "src/common/interfaces/api-response.interface";
import { User } from "src/modules/database/entities/user.entity";
import { Repository, Like } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";
import { AdminUserQueryDto } from "../dto/admin-user-query.dto";
import { UserStatus } from "../../../common/enums/user-status.enum";

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

    /**
     * Get all users with pagination and filtering (Admin)
     * @param query - Pagination and filter parameters
     * @return Paginated users
     */
    async getAllUsers(query: AdminUserQueryDto): Promise<BaseApiResponse<PaginatedResponse<User>>> {
        const { page = 1, limit = 10, userType, status, search } = query;
        const skip = (page - 1) * limit;

        const whereConditions: any = {};
        
        if (userType) {
            whereConditions.userType = userType;
        }
        
        if (status) {
            whereConditions.status = status;
        }

        let queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.business', 'business');

        if (userType) {
            queryBuilder = queryBuilder.andWhere('user.userType = :userType', { userType });
        }

        if (status) {
            queryBuilder = queryBuilder.andWhere('user.status = :status', { status });
        }

        if (search) {
            queryBuilder = queryBuilder.andWhere(
                '(user.email ILIKE :search OR user.firstName ILIKE :search OR user.lastName ILIKE :search)',
                { search: `%${search}%` }
            );
        }

        const [users, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .orderBy('user.createdAt', 'DESC')
            .getManyAndCount();

        const paginatedResponse = new PaginatedResponse(users, total, page, limit);

        return BaseApiResponse.success('Users retrieved successfully', paginatedResponse);
    }

    /**
     * Update user status (Admin)
     * @param userId - User ID
     * @param status - New status
     * @return Updated user
     */
    async updateUserStatus(userId: string, status: UserStatus): Promise<BaseApiResponse<User>> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.status = status;
        const savedUser = await this.userRepository.save(user);

        return BaseApiResponse.success('User status updated successfully', savedUser);
    }

}