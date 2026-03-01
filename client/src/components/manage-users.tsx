"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  useGetAllUsersQuery, 
  useUpdateUserStatusMutation 
} from "@/lib/api/users-api-slice";
import { UserType, UserStatus } from "@/lib/enums";
import { toast } from "sonner";

export function ManageUsers() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [userTypeFilter, setUserTypeFilter] = useState<UserType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const queryParams: Record<string, any> = {
    page,
    limit,
  };

  if (userTypeFilter !== "ALL") {
    queryParams.userType = userTypeFilter;
  }

  if (statusFilter !== "ALL") {
    queryParams.status = statusFilter;
  }

  if (search) {
    queryParams.search = search;
  }

  const { data: usersData, isLoading, refetch } = useGetAllUsersQuery(queryParams);
  const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  const users = usersData?.data?.items || [];
  const total = usersData?.data?.total || 0;
  const totalPages = usersData?.data?.totalPages || 1;

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      await updateUserStatus({ userId, status: newStatus }).unwrap();
      toast.success("User status updated successfully");
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update user status");
    }
  };

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "bg-green-500";
      case UserStatus.INACTIVE:
        return "bg-gray-500";
      case UserStatus.SUSPENDED:
        return "bg-red-500";
      case UserStatus.PENDING:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case UserType.PLATFORM_ADMIN:
        return "Admin";
      case UserType.CONTRACTOR:
        return "Contractor";
      case UserType.HOME_OWNER:
        return "Home Owner";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>
            View, filter, and manage user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="max-w-sm"
              />
            </div>
            <Select
              value={userTypeFilter}
              onValueChange={(value: string) => {
                setUserTypeFilter(value as UserType | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value={UserType.PLATFORM_ADMIN}>Admin</SelectItem>
                <SelectItem value={UserType.CONTRACTOR}>Contractor</SelectItem>
                <SelectItem value={UserType.HOME_OWNER}>Home Owner</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value: string) => {
                setStatusFilter(value as UserStatus | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
                <SelectItem value={UserStatus.SUSPENDED}>Suspended</SelectItem>
                <SelectItem value={UserStatus.PENDING}>Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getUserTypeLabel(user.userType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.status}
                          onValueChange={(value: string) => 
                            handleStatusChange(user.id, value as UserStatus)
                          }
                          disabled={isUpdating}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UserStatus.ACTIVE}>
                              Active
                            </SelectItem>
                            <SelectItem value={UserStatus.INACTIVE}>
                              Inactive
                            </SelectItem>
                            <SelectItem value={UserStatus.SUSPENDED}>
                              Suspended
                            </SelectItem>
                            <SelectItem value={UserStatus.PENDING}>
                              Pending
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {users.length} of {total} users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
