import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }
    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }
    render() {
        let { listUser } = this.props
        return (
            <div className="display-infor-container">
                <img src={logo} />
                <br />
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowListUser === true ? "Hide list user" : "Show list user"}
                </button>
                {this.state.isShowListUser &&
                    <>
                        {listUser.map((user)=> {
                            return(
                                <div key={user.id} className={+user.name.length > 4 ? "green" : "red"}>
                                    <>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    </>
                                    <div>
                                        <button onClick={()=>this.props.handleDelete(user.id)}>Delete</button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        )
    }
}   
export default DisplayInfor