import React from 'react';
import { Link } from 'react-router-dom';

const ActionCard = ({ title, subtitle, icon: Icon, active, to, onClick }) => {
  const content = (
    <>
      <div className="icon-wrapper">
        {Icon && <Icon size={24} />}
      </div>
      <div className="card-text">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`action-card ${active ? 'active' : ''}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`action-card ${active ? 'active' : ''}`} onClick={onClick}>
      {content}
    </div>
  );
};

export default ActionCard;
