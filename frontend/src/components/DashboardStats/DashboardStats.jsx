import './DashboardStats.css';

import {
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';

const DashboardStats = () => {

  const stats = [
    {
      title: 'Total Properties',
      value: '432',
      icon: <FiHome />
    },
    {
      title: 'Pending Verification',
      value: '18',
      icon: <FiCheckCircle />
    },
    {
      title: 'Users',
      value: '267',
      icon: <FiUsers />
    },
    {
      title: 'Verified Properties',
      value: '390',
      icon: <FiTrendingUp />
    }
  ];

  return (
    <div className="stats-grid">

      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <div className="stat-icon">
            {item.icon}
          </div>

          <h3>{item.value}</h3>
          <p>{item.title}</p>
        </div>
      ))}

    </div>
  );
};

export default DashboardStats;