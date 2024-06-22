import { useEffect, useState } from "react"


const TableQuiz = (props) => {



    useEffect(() => {
        props.fetchQuiz()
    }, [])

    

    return (
        <table class="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.ListQuiz && props.ListQuiz.map((item, index) => {
                    return (
                        <tr key={`table-quiz-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td style={{display: 'flex', gap: '15px'}}>
                                <button 
                                className="btn btn-warning"
                                >Edit</button>
                                <button 
                                className="btn btn-danger"
                                onClick={()=>props.handleBtnDeleteQuiz(item)}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default TableQuiz