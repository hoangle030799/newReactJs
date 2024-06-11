import React from "react";
import './DisplayInfor.scss';

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
            <>
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowListUser === true ? "Hide list user" : "Show list user"}
                </button>
                {listUser.map((user) => {
                    return (
                        <div className="display-infor-container">
                            {this.state.isShowListUser &&
                                <div key={user.id} className={+user.name.length > 4 ? "green" : "red"}>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <hr />
                                </div>
                            }
                        </div>
                    )
                })}
            </>
        )
    }
}
export default DisplayInfor