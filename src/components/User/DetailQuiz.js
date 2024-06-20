import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from '../Services/apiService'
import _ from "lodash"
import './DetailQuiz.scss'
import Question from "./Question"



const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    const [dataQuiz, setDataQuiz] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([null]);


    useEffect(() => {
        fetchQuizById()
    }, [quizId])
    const fetchQuizById = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        item.answers.isSeleted = false
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
        }

    }
    const handlePrev = () => {
        if (currentQuestionIndex <= 0) {
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > currentQuestionIndex + 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }
    const handleFinish = () => {

    }
    const handleCB = (index) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(newSelectedAnswers);
    };
    // const handleCB = (answerId, questionId) => {
    //     let dataQuizClone = _.cloneDeep(dataQuiz)
    //     let question = dataQuizClone.find(item => +item.questionId === +questionId)
    //     if (question && question.answers) {
    //         let b = question.answers.map(item =>{
    //             if(+item.id === +answerId){
    //                 item.isSeleted = !item.isSeleted
    //             }
    //             return item
    //         })
    //         // console.log('check b',b)
    //         question.answers = b
    //     }
    //     let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    //     if (index > -1){
    //         dataQuizClone[index] = question
    //         setDataQuiz(dataQuizClone)
    //     }
    // }
    // const nextQuestion = () => {
    //     setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
    // };
    


    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="q-title">
                    <h2>Quiz {quizId}: {location?.state?.quizTitle}</h2>
                </div>
                <hr />
                <div className="q-content">
                    <Question
                        data={dataQuiz[currentQuestionIndex]}
                        index={currentQuestionIndex}
                        handleCB={handleCB}
                        selectedAnswer={selectedAnswers[currentQuestionIndex]}
                    // index = {index}
                    // data={dataQuiz && dataQuiz.length > 0 ?
                    //     dataQuiz[index]
                    //     :
                    //     []
                    // }
                    // handleCB = {handleCB}
                    // selectedAnswers = {selectedAnswers}
                    />
                </div>
                <div className="q-footer">
                    <button onClick={() => handlePrev()} className="btn btn-danger">Prev</button>
                    <button onClick={() => handleNext()} className="btn btn-danger">Next</button>
                    <button onClick={() => handleFinish()} className="btn btn-warning">Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz