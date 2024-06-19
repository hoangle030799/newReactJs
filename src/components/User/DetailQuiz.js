import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {getDataQuiz} from '../Services/apiService'
import { reduce } from "lodash"


const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuizById()
    },[quizId])
    const fetchQuizById = async() => {
            let res = await getDataQuiz(quizId)
            console.log(res)
    }
    return(
        <div>DetailQuiz</div>
    )
}
export default DetailQuiz