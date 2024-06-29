import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from '../Services/apiService'
import _ from "lodash"
import './DetailQuiz.scss'
import Question from "./Question"
import ModalResult from "./ModalResult"
import RightContent from "./Content/RightContent"



const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

    const [dataQuiz, setDataQuiz] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(dataQuiz.length).fill(null))

    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})


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
            setSelectedAnswers(Array(data.length).fill(null))
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

    const handleCB = (index) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleFinish = async () => {
        let a_selected = dataQuiz.map((item, index) => {
            return {
                questionId: +item.questionId,
                userAnswerId: [selectedAnswers[index]]
            }
        })
        let payload = {
            quizId,
            answers: a_selected
        }
        //submit api
        let res = await postSubmitQuiz(payload)
        console.log('check res: ', res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true)
        } else {
            alert('something wrong....')
        }
        return payload;
    }



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
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                    />
                </div>
                <div className="q-footer">
                    <button onClick={() => handlePrev()} className="btn btn-danger">Prev</button>
                    <button onClick={() => handleNext()} className="btn btn-danger">Next</button>
                    <button onClick={() => handleFinish()} className="btn btn-warning">Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    currentQuestionIndex={currentQuestionIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz