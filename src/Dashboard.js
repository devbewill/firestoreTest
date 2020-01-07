import React, { useState, useEffect } from 'react';
import './Dashboard.scss';

import firebase from './firebase';
import Container from '@material-ui/core/Container';
import SingleStudio from './components/SingleStudio';

function Dashboard() {
	const [ studi, setStudi ] = useState([]);
	const [ count, setCount ] = useState();
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		const db = firebase.firestore().collection('studi');

		db.orderBy('nome').onSnapshot((snapshot) => {
			const data = [];

			snapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});

			setStudi(data);
			setCount(data.length);
			setIsLoading(false);
		});
	}, []);

	return (
		<Container maxWidth="xs">
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<React.Fragment>
					<h2>
						<span className="count">{count}</span> studi salvati
					</h2>
					<form className="cardsContainer" noValidate autoComplete="off">
						{studi.map((studio, i) => <SingleStudio key={i} studio={studio} />)}
					</form>
				</React.Fragment>
			)}
		</Container>
	);
}

export default Dashboard;
