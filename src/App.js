import React from 'react';
import './App.css';
import firebase from './firebase';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import AddStudio from './components/AddStudio';
import SimpleCard from './components/SimpleCard';

function App() {
	const [ studi, setStudi ] = React.useState([]);
	const [ dipendenti, setDipendenti ] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const db = firebase.firestore();
			const data = await db.collection('studi').get();
			setStudi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

			const dip = await db.collection('studi').doc('G0TpyhS6ijvlHmPy9OOC').collection('dipendenti').get();
			setDipendenti(dip.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		fetchData();
	}, []);

	return (
		<React.Fragment>
			{/* {console.log(studi)} */}
			<Container maxWidth="xl">
				<Navbar />
				{/* <AddStudio /> */}
				<form className="cardsContainer" noValidate autoComplete="off">
					{studi.map((studio, i) => <SimpleCard key={i} studio={studio} />)}
				</form>
			</Container>
		</React.Fragment>
	);
}

export default App;
