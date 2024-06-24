import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";






const ManageQuestions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];


    const [selectedQuestion, setSelectedQuestion] = useState({})


    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz: </label>
                    <Select
                        value={selectedQuestion}
                        onChange={setSelectedQuestion}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add question
                </div>
                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="text" className="form-control" />
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label
                                className='label-up'
                                htmlFor='label-upload'
                            >Upload image
                            </label>
                            <input
                                type='file'
                                id='label-upload'
                                hidden
                            />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <FaRegPlusSquare className='icon-add' />
                            </span>
                            <span>
                                <FaRegTrashAlt className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="radio"
                            />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <FiPlusCircle className='icon-add' />
                            </span>
                            <span>
                                <FiMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManageQuestions