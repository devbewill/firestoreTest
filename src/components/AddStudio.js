import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledBtn = styled(Button)({
	margin: '0 0.5em'
});

const StyledTextField = styled(TextField)({
	margin: '0 0.5em'
});

function AddStudio() {
	const [ newStudioNome, setNewStudioNome ] = useState('');
	const [ newStudioCity, setNewStudioCity ] = useState('');

	const onCreate = () => {
		const db = firebase.firestore();
		db.collection('studi').add({ nome: newStudioNome, city: newStudioCity });
	};

	return (
		<div className="addBar">
			<StyledTextField
				placeholder="nome"
				value={newStudioNome}
				label="nome"
				onChange={(e) => setNewStudioNome(e.target.value)}
			/>
			<StyledTextField
				placeholder="city"
				value={newStudioCity}
				label="city"
				onChange={(e) => setNewStudioCity(e.target.value)}
			/>
			<StyledBtn variant="contained" color="primary" onClick={onCreate}>
				Add
			</StyledBtn>
		</div>
	);
}

export default AddStudio;
