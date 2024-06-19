import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from '../Services/apiService'
import _ from "lodash"
import './DetailQuiz.scss'



const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizId = params.id

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
            console.log(data)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="q-title">
                    <h2>Quiz {quizId}: {location?.state?.quizTitle}</h2>
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <div className="question">Question 1: aoisdhoaisnd</div>
                    <div className="answers">
                        <div className="a-child">A. apisndpasnd</div>
                        <div className="a-child">B. apisndpasnd</div>
                        <div className="a-child">C. apisndpasnd</div>
                    </div>
                </div>
                <div className="q-footer">
                    <button className="btn btn-danger">Prev</button>
                    <button className="btn btn-danger">Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz