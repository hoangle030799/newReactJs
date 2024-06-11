import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

// class DisplayInfor extends React.Component {

//     render() {
//         let { listUser } = this.props
//         return (
//             <div className="display-infor-container">
//                 {true &&
//                     <>
//                         {listUser.map((user) => {
//                             return (
//                                 <div key={user.id} className={+user.name.length > 4 ? "green" : "red"}>
//                                     <>
//                                         <div>My name is {user.name}</div>
//                                         <div>My age is {user.age}</div>
//                                     </>
//                                     <div>
//                                         <button onClick={() => this.props.handleDelete(user.id)}>Delete</button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }
const DisplayInfor = (props) => {
    let { listUser } = props
    return (
        <div className="display-infor-container">
            {true &&
                <>
                    {listUser.map((user) => {
                        return (
                            <div key={user.id} className={+user.name.length > 4 ? "green" : "red"}>
                                <>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                </>
                                <div>
                                    <button onClick={() => props.handleDelete(user.id)}>Delete</button>
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
export default DisplayInfor