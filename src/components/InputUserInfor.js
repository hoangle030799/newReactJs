import React from "react";

class InputUserInfor extends React.Component {
    state = {
        name: 'Hoàng',
        address: 'Hà Nội',
        age: 24
    }
    handleOnClick = (event) => {
        console.log('My name is: ', this.state.name)
        this.setState({
            name: 'HoangHeoThy'
        })
    }

    handleOnChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }
    render() {
        return (
            <>
                My name is {this.state.name} and i'm from {this.state.address}
                <button onClick={(event) => this.handleOnClick(event)}>Click me</button>
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input type="text" onChange={(event) => this.handleOnChange(event)} />
                    <button>Submit</button>
                </form>
            </>
        )
    }
}
export default InputUserInfor