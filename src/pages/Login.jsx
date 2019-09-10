import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

const UserData = [
    {
        id: 0,
        userName: "Jack",
        password: "developer7",
        photos: []
    }, {
        id: 1,
        userName: "Jameson",
        password: "developer10",
        photos: []
    }, {
        id: 2,
        userName: "Jim",
        password: "developer107",
        photos: []
    }
]

class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            newUserName: '',
            newPassword: '',
            newConfirmPassword: '',
            isRegistered: true,
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    componentWillMount() {
        if (!Object.entries(reactLocalStorage.getObject('allUserData')).length) {
            reactLocalStorage.setObject('allUserData', UserData);
        }
        if (!!reactLocalStorage.get('userId')) {
            window.location.href = '/home';
        }
    }

    login() {
        const {userName, password} = this.state;
        const allUserData = reactLocalStorage.getObject('allUserData');
        const loggedInUser = allUserData.find(user => user.userName.toLowerCase() === userName.trim().toLowerCase());
        const isAuthorizedUser = !!loggedInUser && !!Object.entries(loggedInUser).length;
        const isAuthenticatedUser = isAuthorizedUser && loggedInUser.password === password;
        if (isAuthenticatedUser) {
            reactLocalStorage.setObject('userId', loggedInUser.id);
            window.location.href = '/home';
        } else {
            // invalid user
            //TODO: show error

            // reset user data
            this.setState({
                userName: '',
                password: ''
            });
        }
    }

    register() {
        const {newUserName, newPassword, newConfirmPassword} = this.state;
        // TODO: validate registration parameters
        const allUserData = reactLocalStorage.getObject('allUserData');
        allUserData.push({
            id: allUserData.length,
            userName: newUserName.trim(),
            password: newPassword,
            photos: []
        });
        reactLocalStorage.setObject('allUserData', allUserData);
        this.setState({
            newUserName: '',
            newPassword: '',
            newConfirmPassword: '',
            isRegistered: true,
        });
    }

    render() {
        const {userName, password, newUserName, newPassword, newConfirmPassword, isRegistered} = this.state;
        return (
            <div>
                <div className='login-container'>
                    {
                        !!isRegistered ?
                            ([
                                <div className='login-input-label' key='username'>User Name: <input value={userName}
                                                                                                    onChange={(e) => this.setState({userName: e.target.value})}/>
                                </div>,
                                <div className='login-input-label' key='password'>Password: <input type='password' value={password}
                                                                                                   onChange={(e) => this.setState({password: e.target.value})}/>
                                </div>,
                                <div className='btn' key='login' onClick={this.login}>Login</div>
                            ]) :
                            ([
                                <div className='login-input-label' key='newUsername'>User Name: <input value={newUserName}
                                                                                                       onChange={(e) => this.setState({newUserName: e.target.value})}/>
                                </div>,
                                <div className='login-input-label' key='newPassword'>Password: <input type='password' value={newPassword}
                                                                                                      onChange={(e) => this.setState({newPassword: e.target.value})}/>
                                </div>,
                                <div className='login-input-label' key='newConfirmPassword'>Confirm Password: <input  type='password' value={newConfirmPassword}
                                    onChange={(e) => this.setState({newConfirmPassword: e.target.value})}/>
                                </div>,

                                <div className='btn' onClick={this.register} key='register'>Register</div>
                            ])

                    }
                    <div className='btn'
                         onClick={() => {
                             this.setState((prevState) => ({
                                 isRegistered: !prevState.isRegistered
                             }))
                         }}>{!!isRegistered ? "New User?" : "Go to login"}</div>

                </div>
                <span>NOTE:</span>
                <br />
                <small>* Details of newly registered user will be removed on clearing local storage.</small>
                <br />
                <small>* Uploaded photos for all users will be removed on clearing local storage.</small>
            </div>

        );
    }
}

export default Login;