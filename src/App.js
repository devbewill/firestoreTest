import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import AddStudio from './components/AddStudio';
import SimpleCard from './components/SimpleCard';

function App() {
	const [ studi, setStudi ] = useState([]);
	const [ count, setCount ] = useState();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const db = firebase.firestore();
	// 		const data = await db.collection('studi').get();
	// 		setStudi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	// 		setCount(() => data.docs.length);
	// 	};

	// 	fetchData();
	// }, []);

	useEffect(() => {
		const db = firebase.firestore().collection('studi');

		db.onSnapshot((snapshot) => {
			const data = [];

			snapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});

			setStudi(data);
			setCount(data.length);
		});
	}, []);

	return (
		<React.Fragment>
			<Navbar />
			<Container maxWidth="xl">
				<AddStudio />
				<h2>studi censiti: {count}</h2>
				<form className="cardsContainer" noValidate autoComplete="off">
					{studi.map((studio, i) => <SimpleCard key={i} studio={studio} />)}
				</form>
			</Container>
		</React.Fragment>
	);
}

// 	const [ todos, setTodos ] = useState([]);

// 	useEffect(() => {
// 		const db = firebase.firestore().collection('studi');

// 		db.onSnapshot((snapshot) => {
// 			const retrievedTodos = [];

// 			snapshot.forEach((doc) => {
// 				retrievedTodos.push({ ...doc.data(), id: doc.id });
// 			});

// 			setTodos(retrievedTodos);
// 		});
// 	}, []);

// 	return (
// 		<div>
// 			{todos.map((todo) => {
// 				return <div>{todo.city}</div>;
// 			})}
// 		</div>
// 	);
// }

export default App;
