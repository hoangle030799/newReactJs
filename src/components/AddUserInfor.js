import React from "react";

class AddInputUserInfor extends React.Component {
    state = {
        name: '',
        address: 'Hà Nội',
        age: ''
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
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.handleAddNew({
            id: Math.floor((Math.random() * 100) + 1),
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <>
                {/* My name is {this.state.name} and i'm {this.state.age}
                <button onClick={(event) => this.handleOnClick(event)}>Click me</button> */}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>Your name: </label>
                    <input type="text" onChange={(event) => this.handleOnChange(event)} />
                    <label>Your age: </label>
                    <input type="text" onChange={(event) => this.handleOnChangeAge(event)} />
                    <button>Submit</button>
                </form>
            </>
        )
    }
}
export default AddInputUserInfor