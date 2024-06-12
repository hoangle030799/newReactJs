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
        </div>
    )
}
export default HomePage