import './App.css';
import { Button } from 'react-bootstrap';
import Header from './Pages/Shared/Header/Header';
import CreateNote from './Pages/Notes/CreateNote/CreateNote';

function App() {
    return (
        <div>
            <Header />
            <CreateNote />
        </div>
    );
}

export default App;
