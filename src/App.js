import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import './App.css';
import './Home.scss';
import Admin from './Admin';
import Dashboard from './Dashboard';

function App() {
	return (
		<div className="container">
			<Router>
				<div>
					<ul className="topbar">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/Dashboard">Dashboard</Link>
						</li>
						<li>
							<Link to="/Admin">Admin</Link>
						</li>
					</ul>

					<Route path="/dashboard" component={Dashboard} />
					<Route path="/admin" component={Admin} />
				</div>
			</Router>
		</div>
	);
}

export default App;
