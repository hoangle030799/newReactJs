import _ from "lodash"
import { useEffect, useState } from "react";



const Question = (props) => {
    const { data, index } = props
    // const [selectedAnswer, setSelectedAnswer] = useState([])
    // useEffect(()=> {
    //     setSelectedAnswer(null)
    // }, [data.questionDescription])

    // console.log(data)
    const handleCheckbox = (qIdx, aIdx) => {
        const newSelectedAnswers = [...props.selectedAnswers]
        newSelectedAnswers[qIdx] = aIdx
        props.setSelectedAnswers(newSelectedAnswers)
        // props.setSelectedAnswers((Prev)=> {
        //     return(
        //         [...Prev, index]
        //     )
        // });
        // props.handleCB(index);
        // console.log('data asd: ', data)
        // console.log(data)
    };

    // const handleCheckbox = (event, aId, qId) => {
    //     // console.log('check data: ', aId, qId)
    //     props.handleCB(aId, qId)
    //     console.log(event.target.value)
    //     // event.target.checked = !event.target.checked
    //     // console.log(event.target.checked)

    // }
    // useEffect(()=>{
    //     console.log(props.selectedAnswer)

    // },[props.selectedAnswer])

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
                                        checked={props.selectedAnswers[index] == idx}
                                        onChange={() => handleCheckbox(index, idx)}
                                        value={idx}
                                        data-test1={props.selectedAnswers[index]}
                                        data-test2={idx} />

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