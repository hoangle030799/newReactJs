import _ from "lodash"



const Question = (props) => {
    const { data, index } = props
    const handleCheckbox = (qIdx, aIdx) => {
        const newSelectedAnswers = [...props.selectedAnswers]
        newSelectedAnswers[qIdx] = aIdx
        props.setSelectedAnswers(newSelectedAnswers)
    };

    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            <div className="q-body">
                {data.image ?
                    <img src={`data:image/jpeg;base64, ${data.image}`} /> : <div></div>}
            </div>
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>
            <div className="answers">
                {data.answers && data.answers.length > 0 && props.selectedAnswers.length > 0 &&
                    data.answers.map((a, idx) => {
                        return (
                            <div
                                className="a-child"
                                key={`answer-${idx}`}>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${index}`}
                                        checked={props.selectedAnswers[index] == a.id}
                                        onChange={() => handleCheckbox(index, a.id)}
                                        value={idx}/>
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question