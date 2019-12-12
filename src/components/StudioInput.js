import React from 'react';
import firebase from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StudioInput = ({ studio }) => {
	const [ nome, setNome ] = React.useState(studio.nome);

	const onUpdate = () => {
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).set({ ...studio, nome });
	};

	const onDelete = () => {
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).delete();
	};

	return (
		<React.Fragment>
			<TextField
				placeholder="Placeholder here"
				value={nome}
				label="nome"
				onChange={(e) => {
					setNome(e.target.value);
				}}
			/>

			<Button variant="contained" color="primary" onClick={onUpdate}>
				Update
			</Button>
			<Button variant="contained" color="secondary" onClick={onDelete}>
				Delete
			</Button>
		</React.Fragment>
	);
};

export default StudioInput;
