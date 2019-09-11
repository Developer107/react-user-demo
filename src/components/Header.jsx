import React  from 'react';
import {Link} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

class Header extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentUserData: []
        }
    }
    componentWillMount() {
        const currentUser = reactLocalStorage.get('userId');
        const allUserData = reactLocalStorage.getObject('allUserData');
        if (!!currentUser) {
            this.setState({
                currentUserData: allUserData[currentUser]
            });
            if(this.props.setCurrentUserData) {
                this.props.setCurrentUserData(allUserData[currentUser]);
            }
            if(this.props.setAllUserData) {
                this.props.setAllUserData(allUserData);
            }
        } else {
            // redirect to login
            window.location.href = '/';
        }
    }
    logout() {
        // reset user id in local storage
        reactLocalStorage.set('userId', '');
    }
    render() {
        return (
            <div className='header-container'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={this.logout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;