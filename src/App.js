import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Pages/Shared/Header/Header';
import CreateNote from './Pages/Notes/CreateNote/CreateNote';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Authentication/Login/Login';
import Registration from './Pages/Authentication/Registration/Registration';
function App() {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/note">
                        <CreateNote />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
