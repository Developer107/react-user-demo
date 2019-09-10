import React from 'react';
import {reactLocalStorage} from "reactjs-localstorage";
import {FileRead} from "../helper";
import Header from "../components/Header";
import Gallery from "../components/Gallery";

class Home extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentUserData: {}
        }
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.setCurrentUserData = this.setCurrentUserData.bind(this);
    }
    setCurrentUserData(currentUserData) {
        this.setState({currentUserData});
    }
    uploadPhoto(event) {
        let {currentUserData} = this.state;
        currentUserData = Object.assign({}, currentUserData);

        // read file and save to local storage
        const _this = this;
        FileRead(event.target.files[0], function (base64Data) {
            currentUserData.photos.push({
                id: !!currentUserData.photos.length ? currentUserData.photos.length : 0,
                url: base64Data
            })

            // set in local state
            _this.setState({
                currentUserData
            })

            // set in local storage
            const allUserData = reactLocalStorage.getObject('allUserData');
            allUserData[currentUserData.id] = currentUserData;
            reactLocalStorage.setObject('allUserData', allUserData);
        });
    }

    render() {
        const {currentUserData} = this.state;
        return (
            <div className='home-container'>
                <Header setCurrentUserData={this.setCurrentUserData}/>
                <br />
                <h2>My profile</h2>
                <div className='btn upload-button-container'>
                    <span>Upload</span>
                    <input type="file" onChange={this.uploadPhoto}/>
                </div>

                <div>
                    <Gallery items={currentUserData.photos} />
                </div>
            </div>
        );
    }
}

export default Home;