import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';
import Select from 'react-select';
import('./ManageQuiz.scss');

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];

const ManageQuiz = (props) => {

    const[name, setName] = useState('')
    const[description, setDessciption] = useState('')
    const[type, setType] = useState('Easy')
    const[image, setImage] = useState(null)

    const handleChangeImage = (event) => {

    }
    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new quiz</legend>
                    <div className="form-floating mb-3">
                        <input 
                        type="email" 
                        class="form-control" 
                        id="floatingInput" 
                        placeholder="Name" 
                        value={name}
                        onChange={(event)=>setName(event.target.value)}/>
                        <label for="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input 
                        type="password" 
                        class="form-control" 
                        id="floatingPassword" 
                        placeholder="Description"
                        value={description}
                        onChange={(event)=>setDessciption(event.target.value)} />
                        <label for="floatingPassword">Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            defaultValue={type}
                            // onChange={setSelectedOption}
                            placeholder='Quiz type ...'
                            options={options}

                        />
                    </div>
                    <div className='more-action'>
                        <label className='mb-1'>Upload image</label>
                        <input 
                        type='file' 
                        className='form-control'
                        onChange={(event) => handleChangeImage(event)}/>

                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default ManageQuiz