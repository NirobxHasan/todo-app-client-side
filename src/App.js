import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Pages/Shared/Header/Header';
import CreateNote from './Pages/Notes/CreateNote/CreateNote';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Authentication/Login/Login';
import Registration from './Pages/Authentication/Registration/Registration';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import AllNotes from './Pages/Notes/AllNotes/AllNotes';
function App() {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <PrivateRoute path="/createnote">
                            <CreateNote />
                        </PrivateRoute>
                        <PrivateRoute path="/allnotes">
                            <AllNotes />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/registration">
                            <Registration />
                        </Route>
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
