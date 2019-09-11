import React from 'react';
import DefaultImage from '../images/default.png';

const UserCard = ({ userData }) => {
  const profileImage = userData.photos[0] ? userData.photos[0].url : DefaultImage;
  const redirectToUserPage = () => {
    window.location.href = `/profile/${userData.id}`;
  };
  return (
    <div className="user-card" onClick={redirectToUserPage}>
      <div className="user-card-icon" style={{ backgroundImage: `url(${profileImage})` }} />
      <div className="user-card-name">{userData.userName}</div>
    </div>
  );
};

export default UserCard;
