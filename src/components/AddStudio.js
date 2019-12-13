import React from 'react';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AddStudio() {
	const [ newStudioNome, setNewStudioNome ] = React.useState();
	const [ newStudioCity, setNewStudioCity ] = React.useState();

	const onCreate = () => {
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity });
	};

	return (
		<div className="card">
			<TextField
				placeholder="nome"
				value={newStudioNome}
				label="nome"
				onChange={(e) => setNewStudioNome(e.target.value)}
			/>
			<TextField
				placeholder="city"
				value={newStudioCity}
				label="city"
				onChange={(e) => setNewStudioCity(e.target.value)}
			/>
			<Button variant="contained" color="primary" onClick={onCreate}>
				Add
			</Button>
		</div>
	);
}

export default AddStudio;
