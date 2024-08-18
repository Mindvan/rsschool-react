import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './components/Main/Main.tsx';
import UncontrolledForm from './components/UncontrolledForm';
import HookForm from './components/HookForm';
import './app.scss';

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Main</Link>
        <Link to="/uncontrolled">Uncontrolled Form</Link>
        <Link to="/hookform">Hook Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/hookform" element={<HookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
