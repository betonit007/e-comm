import React from 'react';
import './styles.scss';


const UserProfile = props => {
  const { currentUser, userIMG } = props;
  const { displayName } = currentUser;

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG ? userIMG : "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"} />
          </div>
        </li>
        <li>
          <span className="displayName">
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
