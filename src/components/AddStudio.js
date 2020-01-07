import React, { useState } from 'react';
import firebase from '../firebase';
import ImageUpload from './ImageUpload';

function AddStudio() {
	const [ newStudioNome, setNewStudioNome ] = useState('');
	const [ newStudioCity, setNewStudioCity ] = useState('');
	const [ logo, setLogo ] = useState('');

	const onCreate = (e) => {
		e.preventDefault();
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity, logo });
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

				<ImageUpload logo={logo} setLogo={setLogo} />

				<button variant="contained" color="primary" onClick={onCreate}>
					Add
				</button>
			</div>
		</div>
	);
}

export default AddStudio;
