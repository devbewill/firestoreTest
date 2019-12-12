import React from 'react';
import './App.css';
import firebase from './firebase';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import SimpleCard from './components/SimpleCard';
import StudioInput from './components/StudioInput';

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
		<React.Fragment>
			<Container maxWidth="sm">
				<Navbar />
				<div className="cards">
					{studi.map((studio, i) => (
						<div>
							<SimpleCard key={i} nome={studio.nome} city={studio.city} />
							<StudioInput studio={studio} />
						</div>
					))}
				</div>

				<input value={newStudioNome} onChange={(e) => setNewStudioNome(e.target.value)} />
				<input value={newStudioCity} onChange={(e) => setNewStudioCity(e.target.value)} />
				<button onClick={onCreate}>Add</button>

				<h3>Studi</h3>
			</Container>
		</React.Fragment>
	);
}

export default App;
