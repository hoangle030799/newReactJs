import React from "react";
import InputUserInfor from "./InputUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            {id: 1, name : 'Hoàng', age : '24'},
            {id: 2, name : 'Hiếu', age : '24'},
            {id: 3, name : 'Phương', age : '24'},
        ]
    }
    render() {
        return (
            <>
                <div>
                    <InputUserInfor />
                    <DisplayInfor
                        listUser = {this.state.listUser}
                    />
                </div>
            </>
        )
    }
}
export default MyComponent