import React, { useState } from 'react';
import firebase from '../firebase';

function AddStudio() {
	const [ newStudioNome, setNewStudioNome ] = useState('');
	const [ newStudioCity, setNewStudioCity ] = useState('');

	const onCreate = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity });
		setNewStudioNome('');
		setNewStudioCity('');
	};

	return (
		<div className="container">
			<h2>Add new studio</h2>

			<div className="addBar">
				<input
					placeholder="nome"
					value={newStudioNome}
					label="nome"
					onChange={(e) => setNewStudioNome(e.target.value)}
				/>
				<input
					placeholder="city"
					value={newStudioCity}
					label="city"
					onChange={(e) => setNewStudioCity(e.target.value)}
				/>
				<button variant="contained" color="primary" onClick={onCreate}>
					Add
				</button>
			</div>
		</div>
	);
}

export default AddStudio;
