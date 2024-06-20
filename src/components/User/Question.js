import _ from "lodash"



const Question = (props) => {
    const { data, index } = props
    if (_.isEmpty(data)) {
        return (<></>)
    }
    console.log(data)
    return (
        <>
            <div className="q-body">
                {data.image &&
                    <img src={`data:image/jpeg;base64, ${data.image}`} />}
            </div>
            <div className="question">Question {index + 1}: {data.questionDescription}</div>
            <div className="answers">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((id, index) => {
                        return (
                            <div
                                className="a-child"
                                key={`answer-${index}`}>
                                <div class="form-check">
                                    <input class="form-check-input" 
                                    type="radio" name="exampleRadios" 
                                    value="option1" 
                                    checked/>
                                        <label class="form-check-label">
                                        {id.description}
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