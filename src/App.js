import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { UserLayout } from '../src/components/UserLayout';
import { AdminLayout } from './components/AdminLayout';
import { publicRoutes, privateRoutes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<UserLayout />}>
                    {publicRoutes.map((route, i) => (
                        <Route key={i} path={route.path} element={route.component} exact={route.exact} />
                    ))}
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    {privateRoutes.map((route, i) => (
                        <Route key={i} path={route.path} element={route.component} exact={route.exact} />
                    ))}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
