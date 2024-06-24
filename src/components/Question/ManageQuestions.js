import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'lodash';
import _ from 'lodash';






const ManageQuestions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];


    const [selectedQuestion, setSelectedQuestion] = useState({})
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: null,
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'add') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: null,
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'remove') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
        console.log('check', type, id)
    }
    const handleAddRemoveAnswer = (type, qId, aId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'add') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === qId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 'remove') {
            let index = questionsClone.findIndex(item => item.id === qId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aId)
            setQuestions(questionsClone)
        }
    }




    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuestion}
                        onChange={setSelectedQuestion}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question
                </div>
                {questions && questions.length > 0
                    && questions.map((item, index) => {
                        return (
                            <div key={item.id} className='q-main mb-4'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={item.description} />
                                        <label>Question {index + 1} 's description</label>
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
                                        <span onClick={() => handleAddRemoveQuestion('add', '')}>
                                            <FaRegPlusSquare className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('remove', item.id)}>
                                                <FaRegTrashAlt className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {item.answers && item.answers.length > 0
                                    && item.answers.map((answer, index) => {
                                        return (
                                            <div className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="radio"
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={answer.description} />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('add', item.id)}>
                                                        <FiPlusCircle className='icon-add' />
                                                    </span>
                                                    {item.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('remove', item.id, answer.id)}>
                                                            <FiMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default ManageQuestions