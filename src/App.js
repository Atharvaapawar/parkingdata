import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import ListEntries from './components/ListEntries';
import CreateEntries from './components/CreateEntries';
import EditEntries from './components/EditEntries';

function App() {
    return (
        <div className="App" style={{ textAlign: "center", background: "#f9f9f9", padding: "20px" }}>
            <h2 style={{ color: "#000000" }}>License Plate Manager & User Profiles</h2>
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" style={{ marginRight: "10px" }}>
                                List Entries
                            </Link>
                        </li>
                        <li>
                            <Link to="user/create">
                                Create Entry
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route index element={<ListEntries />} />
                    <Route path="user/create" element={<CreateEntries />} />
                    <Route path="user/:id/edit" element={<EditEntries />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
