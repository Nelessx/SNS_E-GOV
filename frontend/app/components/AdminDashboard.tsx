'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
}

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/pending-users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPendingUsers(data);
      } else {
        toast.error('Failed to fetch pending users');
      }
    } catch (error) {
      toast.error('An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/approve-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('User approved successfully');
        fetchPendingUsers(); // Refresh the list
      } else {
        toast.error('Failed to approve user');
      }
    } catch (error) {
      toast.error('An error occurred while approving user');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Pending User Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <p>No pending users to approve</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <Card key={user._id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Button
                      onClick={() => handleApprove(user._id)}
                      variant="default"
                    >
                      Approve
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 