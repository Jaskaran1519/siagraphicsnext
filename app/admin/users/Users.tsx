"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/models/UserModel";
import { formatId } from "@/lib/utils1";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading("Deleting user...");
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("User deleted successfully", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );
  if (error) return "An error has occurred.";
  if (!users)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div>
      <h1 className="py-4 text-2xl">Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left hidden md:table-cell">Email</th>
              <th className="p-2 text-left hidden md:table-cell">Admin</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{formatId(user._id)}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2 hidden md:table-cell">{user.email}</td>
                <td className="p-2 hidden md:table-cell">
                  {user.isAdmin ? "YES" : "NO"}
                </td>
                <td className="p-2">
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <span className="font-medium">Email:</span>{" "}
                          {user.email}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="font-medium">Admin:</span>{" "}
                          {user.isAdmin ? "YES" : "NO"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/users/${user._id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteUser({ userId: user._id })}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-2">
                    <Link href={`/admin/users/${user._id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUser({ userId: user._id })}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
