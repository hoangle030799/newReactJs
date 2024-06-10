import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Hoàng',
        address: 'Hà Nội',
        age: 24
    }
    render() {
        return (
            <>
                <div>
                    My name is {this.state.name} and i'm from {this.state.address}
                </div>
            </>
        )
    }
}
export default MyComponent