import _ from "lodash"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";



const Question = (props) => {
    const { data, index } = props
    const handleCheckbox = (qIdx, aIdx, aIndex, value) => {
        const newSelectedAnswers = [...props.selectedAnswers]
        newSelectedAnswers[qIdx] = aIdx
        props.setSelectedAnswers(newSelectedAnswers)
        data.answers[aIndex].isSeleted = value
    };
    const [isPreviewImage, setIsPreviewImage] = useState(false)

    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            <div className="q-body">
                {data.image ?
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64, ${data.image}`} /> : <div></div>}
            </div>
            {isPreviewImage === true &&
                <Lightbox
                    image={`data:image/jpeg;base64, ${data.image}`} title={'Question Image'}
                    onClose={() => setIsPreviewImage(false)}
                ></Lightbox>}
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
                                        onChange={(event) => handleCheckbox(index, a.id, idx, event.target.checked)}
                                        value={idx} />
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