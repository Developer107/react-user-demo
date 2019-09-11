import React from 'react';
import UserCard from '../components/UserCard';
import Header from '../components/Header';

class Users extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      allUserData: [],
    };
    this.setAllUserData = this.setAllUserData.bind(this);
  }

  setAllUserData(allUserData) {
    this.setState({ allUserData });
  }

  render() {
    const { allUserData } = this.state;
    return (
      <div>
        <Header setAllUserData={this.setAllUserData} />
        <br />
        <h2>All users</h2>
        {
                    !!allUserData && allUserData.map((user) => (<UserCard key={`user${user.id}`} userData={user} />))
                }
      </div>
    );
  }
}

export default Users;
