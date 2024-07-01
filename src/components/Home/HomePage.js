import videoHomePage from '../../Assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';


const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    type="video/mp4"
                    src={videoHomePage}
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    <h1>{t('homepage.title1')}</h1>


                </div>
                <div className='title-2'>
                    {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/Login')}>Get stated-it's free</button>
                        :
                        <button onClick={() => navigate('/User')}>Doing quiz now</button>
                    }

                </div>
            </div>
        </div>
    )
}
export default HomePage