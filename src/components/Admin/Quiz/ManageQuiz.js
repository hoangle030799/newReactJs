import { useState } from 'react';
import Select from 'react-select';
import { TiPlus } from "react-icons/ti";
import { postCreateNewQuiz } from '../../Services/apiService'
import { toast } from 'react-toastify';
import './ManageQuiz.scss';
import { RiImageAddFill } from "react-icons/ri";


const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('')
    const [description, setDessciption] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState('')


    const handleChangeImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage((event.target.files[0]))
        } else {
            setPreviewImage('')
        }
    }
    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDessciption('')
        } toast.error(res.EM)
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
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                        <label for="floatingInput">Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Description"
                            value={description}
                            onChange={(event) => setDessciption(event.target.value)} />
                        <label for="floatingPassword">Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            defaultValue={type}
                            onChange={setType}
                            placeholder='Quiz type ...'
                            options={options}
                        />
                    </div>
                    <div className='more-action'>
                        <div className='form-upload-image'>
                            <div className='btn-group'>
                                <label className='mb-1 label-upload' htmlFor='upLoadImage'>
                                    <RiImageAddFill />Upload image
                                </label>
                                <input
                                    type='file'
                                    className='form-control'
                                    id='upLoadImage'
                                    hidden
                                    onChange={(event) => handleChangeImage(event)} />
                                <button
                                    className='btn-1'
                                    onClick={() => handleSubmitQuiz()}
                                >
                                    <TiPlus /> Create
                                </button>
                            </div>

                            <div className='preview-image'>
                                {previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span>Preview image</span>
                                }
                            </div>
                        </div>

                    </div>

                </fieldset>
            </div>
        </div>
    )
}

export default ManageQuiz