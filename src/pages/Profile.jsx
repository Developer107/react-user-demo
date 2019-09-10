import React from 'react';
import Header from "../components/Header";
import Gallery from "../components/Gallery";

class Profile extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            selectedUserData: {}
        }
        this.setAllUserData = this.setAllUserData.bind(this);
    }

    setAllUserData(allUserData) {
        const selectedUserId = this.props.match.params.id;
        const selectedUserData = allUserData.find(user => user.id === parseInt(selectedUserId, 0));
        this.setState({selectedUserData});
    }

    render() {
        const {selectedUserData} = this.state;
        return (
            <div>
                <Header setAllUserData={this.setAllUserData}/>
                {
                    !!selectedUserData &&
                    <div className='selected-user-details'>
                        <h2>{selectedUserData.userName}</h2>
                        <Gallery items={selectedUserData.photos} />
                    </div>
                }
            </div>
        );
    }
}

export default Profile;