import React from "react";
import InputUserInfor from "./InputUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    
    render() {
        return (
            <>
                <div>
                    <InputUserInfor />
                    <DisplayInfor
                        name = 'Hoàng'
                        age = '24'
                    />
                </div>
            </>
        )
    }
}
export default MyComponent