import React, { useState, useEffect } from 'react';
import './Admin.scss';
import firebase from './firebase';
import Container from '@material-ui/core/Container';
import AddStudio from './components/AddStudio';
import SimpleCard from './components/SimpleCard';

function Admin() {
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
		<React.Fragment>
			<Container maxWidth="xl">
				{isLoading && <div>Loading...</div>}
				<AddStudio />
				{!isLoading && (
					<React.Fragment>
						<h2>
							<span className="count">{count}</span> studi salvati
						</h2>
						<form className="cardsContainer" noValidate autoComplete="off">
							{studi.map((studio, i) => <SimpleCard key={i} studio={studio} />)}
						</form>
					</React.Fragment>
				)}
			</Container>
		</React.Fragment>
	);
}

export default Admin;
