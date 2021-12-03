import CreateNote from './Pages/Notes/CreateNote/CreateNote';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Authentication/Login/Login';
import Registration from './Pages/Authentication/Registration/Registration';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Authentication/PrivateRoute/PrivateRoute';
import AllNotes from './Pages/Notes/AllNotes/AllNotes';
import PurchasePackage from './Pages/Subscription/PurchesPackage/PurchasePackage';
import Subscriptions from './Pages/Subscription/Subscriptions/Subscriptions';
import Profile from './Pages/Profile/Profile';
import AdminRoute from './Pages/Authentication/AdminRoute/AdminRoute';
import Users from './Pages/Admin/Users/Users';
import NavBar from './Pages/Shared/NavBar/NavBar';
import AddSubscription from './Pages/Admin/AdminSubscription/AddSubscription';
import AllSubscription from './Pages/Admin/AdminSubscription/AllSubscription';
function App() {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/subscription">
                            <Subscriptions />
                        </Route>
                        <PrivateRoute path="/createnote">
                            <CreateNote />
                        </PrivateRoute>
                        <PrivateRoute path="/profile">
                            <Profile />
                        </PrivateRoute>
                        <PrivateRoute path="/allnotes">
                            <AllNotes />
                        </PrivateRoute>
                        <PrivateRoute path="/purchasePackage/:id">
                            <PurchasePackage />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/registration">
                            <Registration />
                        </Route>
                        <AdminRoute path="/users">
                            <Users />
                        </AdminRoute>
                        <AdminRoute path="/adminSubscription">
                            <AddSubscription />
                        </AdminRoute>
                        <AdminRoute path="/allSubscription">
                            <AllSubscription />
                        </AdminRoute>
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
