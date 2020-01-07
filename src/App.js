import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Admin from './Admin';
import Dashboard from './Dashboard';

function App() {
	return (
		<React.Fragment>
			<Router>
				<div>
					<ul>
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
		</React.Fragment>
	);
}

export default App;
