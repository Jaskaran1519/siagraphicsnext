'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

interface UserTableProps {
  users: User[]
  deleteUser: (params: { userId: string }) => void
  formatId: (id: string) => string
}

export function UserTable({ users, deleteUser, formatId }: UserTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left hidden md:table-cell">Email</th>
            <th className="p-2 text-left hidden md:table-cell">Admin</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{formatId(user._id)}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2 hidden md:table-cell">{user.email}</td>
              <td className="p-2 hidden md:table-cell">{user.isAdmin ? "YES" : "NO"}</td>
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
                        <span className="font-medium">Email:</span> {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span className="font-medium">Admin:</span> {user.isAdmin ? "YES" : "NO"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/admin/users/${user._id}`} className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteUser({ userId: user._id })}>
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
                  <Button variant="ghost" size="sm" onClick={() => deleteUser({ userId: user._id })}>
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
  )
}