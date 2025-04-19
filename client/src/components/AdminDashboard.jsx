import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [applicationsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/forms/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setApplications(applicationsRes.data.forms);
        setUsers(usersRes.data.users);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleApprove = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/forms/approve/${applicationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Application approved successfully');
      // Refresh applications
      const response = await axios.get('http://localhost:5000/api/forms/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data.forms);
    } catch (error) {
      toast.error('Failed to approve application');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/forms/reject/${applicationId}`,
        { remarks: 'Application rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Application rejected successfully');
      // Refresh applications
      const response = await axios.get('http://localhost:5000/api/forms/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data.forms);
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Applications Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Pending Applications</h2>
        <div className="grid gap-6">
          {applications.filter(app => app.status === 'pending').map((app) => (
            <div
              key={app.applicationId}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{app.applicationName}</h3>
                  <p className="text-gray-600">Application ID: {app.applicationId}</p>
                  <p className="text-gray-600">
                    Submitted by: {app.user?.name || 'Unknown User'}
                  </p>
                  <p className="text-gray-600">
                    Submitted on: {new Date(app.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(app.applicationId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app.applicationId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Users Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Users</h2>
        <div className="grid gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">
                    Role: {user.role === 'admin' ? 'Admin' : 'User'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard; 