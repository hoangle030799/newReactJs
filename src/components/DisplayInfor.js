import React from "react";

class DisplayInfor extends React.Component {
    render() {
        let { listUser } = this.props
        return (
            <>
                {listUser.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>My name is {user.name}</div>
                            <div>My age is {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </>
        )
    }
}
export default DisplayInfor