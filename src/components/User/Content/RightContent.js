import CountDown from "./CountDown"


const RightContent = (props) => {
    const { dataQuiz, currentQuestionIndex } = props
    // console.log('check data: ', dataQuiz)

    const onTimeUp = () => {
        props.handleFinish()
    }

    const setClass = (question, index) => {
        console.log('check question: ', question)
        if (question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSeleted === true)
            if (isAnswered) {
                return "question selected"
            }
        }
        if(currentQuestionIndex === index){
            return "question clicked"
        }
        return "question"
    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question - ${index}`}
                                className={setClass(item, index)}
                                onClick={() => props.setCurrentQuestionIndex(index)}
                            >{index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent