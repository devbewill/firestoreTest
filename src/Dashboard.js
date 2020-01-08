import React, { useState, useEffect } from 'react';
import './Dashboard.scss';

import firebase from './firebase';
import SingleStudio from './components/SingleStudio';

function Dashboard() {
	const [ studi, setStudi ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		const db = firebase.firestore().collection('studi');

		db.orderBy('nome').onSnapshot((snapshot) => {
			const data = [];

			snapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});

			setStudi(data);
			setIsLoading(false);
		});
	}, []);

	return (
		<div className="dashboardWrapper">
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<React.Fragment>
					{/* <h2>
						<span className="count">{count}</span> studi salvati
					</h2> */}
					<div className="studiosList">
						{studi.map((studio, i) => <SingleStudio key={i} studio={studio} />)}
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default Dashboard;
