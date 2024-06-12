import videoHomePage from '../../Assets/video-homepage.mp4'
const HomePage = (props) => {
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
                    <h1>There's a better way to ask</h1>
                </div>
                <div className='title-2'>
                    You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead-and make everyone happy.
                </div>
                <div className='title-3'>
                    <button>Get stated-it's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage