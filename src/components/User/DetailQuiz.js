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
    const [index, setIndex] = useState(0)

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
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
        }

    }
    const handlePrev = () => {
        if(index <= 0){
            return
        }
        setIndex(index - 1)
    }
    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index + 1){
            setIndex(index + 1)
        }
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
                        index = {index}
                        data={dataQuiz && dataQuiz.length > 0 ?
                            dataQuiz[index]
                            :
                            []
                        }
                    />
                </div>
                <div className="q-footer">
                    <button onClick={() => handlePrev()} className="btn btn-danger">Prev</button>
                    <button onClick={() => handleNext()} className="btn btn-danger">Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz