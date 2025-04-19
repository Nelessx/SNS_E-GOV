"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus, Users, Clock, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface User {
  _id: string
  userId: string
  name: string
  email: string
  status: string
  createdAt: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPendingUsers()
    // Refresh the list every 30 seconds
    const interval = setInterval(fetchPendingUsers, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/auth/pending-users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        // Sort users by creation date (newest first)
        const sortedUsers = data.sort((a: User, b: User) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setUsers(sortedUsers)
      } else {
        toast.error("Failed to fetch pending users")
      }
    } catch (error) {
      toast.error("An error occurred while fetching users")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (userId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/auth/approve-user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success("User approved successfully")
        fetchPendingUsers() // Refresh the list
      } else {
        toast.error("Failed to approve user")
      }
    } catch (error) {
      toast.error("An error occurred while approving user")
    }
  }

  const handleReject = async (userId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/auth/reject-user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success("User rejected successfully")
        fetchPendingUsers() // Refresh the list
      } else {
        toast.error("Failed to reject user")
      }
    } catch (error) {
      toast.error("An error occurred while rejecting user")
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage user registrations and approvals</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                Users waiting for approval
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Pending User Approvals</CardTitle>
            <CardDescription>
              Review and approve new user registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No pending users</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  There are no users waiting for approval.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-mono">{user.userId}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(user._id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(user._id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 