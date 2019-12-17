import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import AddStudio from './components/AddStudio';
import SimpleCard from './components/SimpleCard';

function App() {
	const [ studi, setStudi ] = useState([]);
	const [ count, setCount ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const db = firebase.firestore();
			const data = await db.collection('studi').get();
			setStudi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setCount(() => data.docs.length);
		};

		fetchData();
	}, []);

	return (
		<React.Fragment>
			<Navbar />
			<Container maxWidth="xl">
				<AddStudio count={(count, setCount)} />
				<h2>studi censiti: {count}</h2>
				<form className="cardsContainer" noValidate autoComplete="off">
					{studi.map((studio, i) => <SimpleCard key={i} studio={studio} />)}
				</form>
			</Container>
		</React.Fragment>
	);
}

export default App;
