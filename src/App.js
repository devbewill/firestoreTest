import React from 'react';
import './App.css';
import firebase from './firebase';
import { StudioInput } from './StudioInput';

function App() {
	const [ studi, setStudi ] = React.useState([]);
	const [ newStudioNome, setNewStudioNome ] = React.useState();
	const [ newStudioCity, setNewStudioCity ] = React.useState();

	React.useEffect(() => {
		const fetchData = async () => {
			const db = firebase.firestore();
			const data = await db.collection('studi').get();

			setStudi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		fetchData();
	}, []);

	const onCreate = () => {
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity });
	};

	return (
		<ul>
			<input value={newStudioNome} onChange={(e) => setNewStudioNome(e.target.value)} />
			<input value={newStudioCity} onChange={(e) => setNewStudioCity(e.target.value)} />
			<button onClick={onCreate}>Add</button>

			<h3>Studi</h3>
			{studi.map((studio, i) => (
				<li key={i}>
					<h5>{studio.nome}</h5>
					<h6>{studio.city}</h6>
					<StudioInput studio={studio} />
				</li>
			))}
		</ul>
	);
}

export default App;
