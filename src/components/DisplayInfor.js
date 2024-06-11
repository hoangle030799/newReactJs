import React from "react";

class DisplayInfor extends React.Component {
    render() {
        let { name, age } = this.props
        return (
            <>
                <div>My name is {name}</div>
                <div>My age is {age}</div>
            </>
        )
    }
}
export default DisplayInfor