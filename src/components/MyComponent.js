import React from "react";
import AddInputUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: 'Hoàng', age: '24' },
            { id: 2, name: 'Hiếu', age: '24' },
            { id: 3, name: 'Phương', age: '24' },
        ]
    }
    handleAddNew = (event) => {
        this.setState({
            listUser: [event, ...this.state.listUser]
        })
        console.log(event)
    }
    render() {
        return (
            <>
                <div>
                    <AddInputUserInfor
                        handleAddNew={this.handleAddNew}
                    />
                    <br /><br />
                    <DisplayInfor
                        listUser={this.state.listUser}
                    />
                </div>
            </>
        )
    }
}
export default MyComponent