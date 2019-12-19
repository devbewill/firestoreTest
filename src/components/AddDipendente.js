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

function AddDipendente({ studio }) {
	const [ newDipNome, setNewDipNome ] = useState('');
	const [ newDipCognome, setNewDipCognome ] = useState('');

	const onCreate = () => {
		const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);
		db.add({ nome: newDipNome, cognome: newDipCognome });
		setNewDipNome('');
		setNewDipCognome('');
	};

	return (
		<div className="addBar">
			<StyledTextField
				placeholder="nome"
				value={newDipNome}
				label="nome"
				onChange={(e) => setNewDipNome(e.target.value)}
			/>
			<StyledTextField
				placeholder="cognome"
				value={newDipCognome}
				label="cognome"
				onChange={(e) => setNewDipCognome(e.target.value)}
			/>
			<StyledBtn variant="contained" color="primary" onClick={onCreate}>
				Add
			</StyledBtn>
		</div>
	);
}

export default AddDipendente;
