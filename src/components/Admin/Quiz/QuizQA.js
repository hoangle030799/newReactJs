import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postNewQuestionForQuiz, postNewAnswerForQuestion } from '../../Services/apiService';
import { toast } from 'react-toastify';





const QuizQA = (props) => {
    const initQuestion = [
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
    const [questions, setQuestions] = useState(initQuestion)
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImage, setDataImage] = useState({
        url: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

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

    const handleOnChange = (type, qId, value) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'question') {
            let index = questionsClone.findIndex(item => item.id === qId)
            questionsClone[index].description = value
            setQuestions(questionsClone)
        }
    }
    const handleOnChangeImage = (qId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === qId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }
    const handlePreImage = (qId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === qId)
        if (index > -1) {
            setDataImage({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }
    const handleAnswerQuestion = (type, qId, aId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === qId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === aId) {
                    if (type === 'check') {
                        answer.isCorrect = value
                    }
                    if (type === 'answer') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(questionsClone)
        }
    }
    const handleSaveQuestion = async () => {
        //validate Data
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz !!!')
            return;
        }
        for (const question of questions) {
            if (!question.description) {
                toast.error('qq')
                return;
            }
        }
        for (const q of questions){
            for (const a of q.answers){
                if(!a.description){
                    toast.error('aa')
                    return
                }
            }
        }
        //submit question
        for (const question of questions) {
            const q = await postNewQuestionForQuiz(selectedQuiz.value, question.description, question.imageFile);
            //submit answer
            for (const item of question.answers) {
                await postNewAnswerForQuestion(item.description, item.isCorrect, q.DT.id)
            }
        }
        toast.success('Add question succed')
        setQuestions(initQuestion)
        setSelectedQuiz({})
    }
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id}-${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    useEffect(() => {
        fetchQuiz()
    }, [])



    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                            value={item.description}
                                            onChange={(event) => handleOnChange('question', item.id, event.target.value)} />
                                        <label>Question {index + 1} 's description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label
                                            className='label-up'
                                            htmlFor={`${item.id}`}
                                        >Upload image
                                        </label>
                                        <input
                                            type='file'
                                            id={`${item.id}`}
                                            onChange={(event) => handleOnChangeImage(item.id, event)}
                                            hidden
                                        />
                                        <span>{item.imageName ?
                                            <span onClick={() => handlePreImage(item.id)} style={{ cursor: 'pointer' }}>
                                                {item.imageName}
                                            </span>
                                            :
                                            '0 file is uploaded'}
                                        </span>
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
                                                    name={`question-${item.id}`}
                                                    value={item.answers.index}
                                                    onChange={(event) => handleAnswerQuestion('check', item.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('answer', item.id, answer.id, event.target.value)} />
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

                <div className='mt-4'>
                    <button
                        className='btn btn-warning'
                        onClick={() => handleSaveQuestion()}
                    >
                        Save Question
                    </button>
                </div>
            </div>
            {isPreviewImage === true &&
                <Lightbox
                    image={dataImage.url} title={dataImage.title}
                    onClose={() => setIsPreviewImage(false)}
                ></Lightbox>}
        </div>
    )
}
export default QuizQA