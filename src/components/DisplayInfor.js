import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

class DisplayInfor extends React.Component {
    constructor(props) {
        console.log('contructor')
        super(props)
        this.state = {
            isShowListUser: true
        }
    }
    componentDidMount() {
        console.log('did mount')
        setTimeout(()=>{
            document.title = 'HoangHeoThy'
        }, 5000)
    }
    componentDidUpdate(prevProps){
        console.log('did update')
        if (this.props.listUser !== prevProps.listUser){
            if (this.props.listUser.length ===5){
                alert('You got 5 users !!!')
            }
        }
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
                {/* <img src={logo} />
                <br /> */}
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowListUser === true ? "Hide list user" : "Show list user"}
                </button>
                {this.state.isShowListUser &&
                    <>
                        {listUser.map((user) => {
                            return (
                                <div key={user.id} className={+user.name.length > 4 ? "green" : "red"}>
                                    <>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                    </>
                                    <div>
                                        <button onClick={() => this.props.handleDelete(user.id)}>Delete</button>
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