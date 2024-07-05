import './Profile.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Priview from '../../Assets/preview.jpg'
import { useEffect, useState } from 'react';
import {postProfile} from '../Services/apiService'
import UserInfor from './UserInfor';
import ChangePassWord from './ChangePassword';


const Profile = (props) => {
    const { lgShow, setLgShow } = props
    
    return (
        <>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="Container mb-3 "
                    >
                        <Tab eventKey="Main Infor" title="Main Infor">
                            <UserInfor />
                        </Tab>
                        <Tab eventKey="Password" title="Password">
                            <ChangePassWord/>
                        </Tab>
                        <Tab eventKey="History" title="History">
                            History
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Profile