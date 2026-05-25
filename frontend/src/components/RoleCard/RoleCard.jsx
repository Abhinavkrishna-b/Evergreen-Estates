import './RoleCard.css';

const RoleCard = ({ Icon, title, isSelected, onClick }) => {
  return (
    <div 
      className={`role-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <div className="role-icon-wrapper">
        <Icon className="role-icon" size={20} />
      </div>
      <span className="role-title">{title}</span>
    </div>
  );
};

export default RoleCard;