import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import { useNavigate } from 'react-router-dom';
import ManageQuiz from './components/Admin/Quiz/ManageQuiz';
import ManageQuestions from './components/Question/ManageQuestions';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { Suspense } from 'react';

const Layout = (props) => {
    const navigate = useNavigate()

    const NotFound = () => {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <button className="btn btn-primary" onClick={()=>navigate('/')}>Go Home</button>
                </div>
            </div>
        )
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='user' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                        } />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admin' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                    } >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<ManageQuestions />} />
                </Route>
                <Route path='Login' element={<Login />} />
                <Route path='Register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </Suspense>
    )
}
export default Layout