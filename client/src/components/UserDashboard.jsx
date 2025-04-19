import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/forms/my-forms', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setApplications(response.data.forms);
      } catch (error) {
        toast.error('Failed to fetch applications');
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No applications found</p>
          <button
            onClick={() => navigate('/apply')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Apply Now
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app.applicationId}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{app.applicationName}</h2>
                  <p className="text-gray-600">Application ID: {app.applicationId}</p>
                  <p className="text-gray-600">
                    Submitted on: {new Date(app.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              {app.remarks && (
                <div className="mt-4">
                  <p className="text-gray-600">Remarks: {app.remarks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 