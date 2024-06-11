import React, { useState } from "react";
import AddInputUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: 'Hoàng', age: '24' },
//             { id: 2, name: 'Hiếu', age: '24' },
//             { id: 3, name: 'Phương', age: '24' },
//         ]
//     }
//     handleAddNew = (event) => {
//         this.setState({
//             listUser: [event, ...this.state.listUser]
//         })
//         console.log(event)
//     }
//     handleDelete = (userID) => {
//         let newListUser = [...this.state.listUser]
//         newListUser = newListUser.filter(item => item.id !== userID)
//         this.setState({
//             listUser: newListUser
//         })
//     }
//     render() {
//         return (
//             <>
//                 <AddInputUserInfor
//                     handleAddNew={this.handleAddNew}
//                 />
//                 <br /><br />
//                 <DisplayInfor
//                     listUser={this.state.listUser}
//                     handleDelete = {this.handleDelete}
//                 />
//             </>
//         )
//     }
// }
const MyComponent = (props) => {
    const [listUser, setListUser] = useState(
        [
            { id: 1, name: 'Hoàng', age: '24' },
            { id: 2, name: 'Hiếu', age: '24' },
            { id: 3, name: 'Phương', age: '24' }
        ]
    )
    const handleAddNew = (event) => {
        setListUser([event, ...listUser])
        console.log(event)
    }
    const handleDelete = (userID) => {
        let newListUser = [...listUser]
        newListUser = newListUser.filter(item => item.id !== userID)
        setListUser(newListUser)
    }
    return (
        <>
            <AddInputUserInfor
                handleAddNew={handleAddNew}
            />
            <br /><br />
            <DisplayInfor
                listUser={listUser}
                handleDelete={handleDelete}
            />
        </>
    )
}
export default MyComponent