import _ from "lodash"
import { useEffect, useState } from "react"



const Question = (props) => {
    const { data, index } = props
    // const [selectedAnswer, setSelectedAnswer] = useState(null)
    // useEffect(()=> {
    //     setSelectedAnswer(null)
    // }, [data.questionDescription])
    if (_.isEmpty(data)) {
        return (<></>)
    }
    // console.log(data)
    const handleCheckbox = (idx) => {
        // setSelectedAnswer(index);
        props.handleCB(idx);
    };
    
    // const handleCheckbox = (event, aId, qId) => {
    //     // console.log('check data: ', aId, qId)
    //     props.handleCB(aId, qId)
    //     console.log(event.target.value)
    //     // event.target.checked = !event.target.checked
    //     // console.log(event.target.checked)

    // }
    

    return (
        <>
            <div className="q-body">
                {data.image ?
                    <img src={`data:image/jpeg;base64, ${data.image}`} /> : <div></div>}
            </div>
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>
            <div className="answers">
                {data.answers && data.answers.length > 0 &&
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
                                        checked = {props.selectedAnswer === idx}
                                        onChange={() => handleCheckbox(idx)} />
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