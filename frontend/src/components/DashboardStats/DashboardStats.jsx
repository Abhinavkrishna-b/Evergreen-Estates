import { useState, useEffect } from 'react';
import {
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';
import { getDashboardStats } from '../../services/adminService';
import './DashboardStats.css';

const DashboardStats = () => {
  
  // Backend States
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingVerifications: 0,
    totalUsers: 0,
    activeListings: 0, 
  });
  const [loading, setLoading] = useState(true);

  // Fetching Logic
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data.stats);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Map Backend Data to UI Cards
  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: <FiHome />
    },
    {
      title: 'Pending Verification',
      value: stats.pendingVerifications,
      icon: <FiCheckCircle />
    },
    {
      title: 'Users',
      value: stats.totalUsers,
      icon: <FiUsers />
    },
    {
      title: 'Verified Properties', 
      value: stats.activeListings, 
      icon: <FiTrendingUp />
    }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((item) => (
        <div className="stat-card" key={item.title}>
          <div className="stat-icon">
            {item.icon}
          </div>

          <h3>{loading ? '...' : item.value}</h3>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;