import React from 'react';
import firebase from './firebase';

export const StudioInput = ({ studio }) => {
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
		<div>
			<input
				value={nome}
				onChange={(e) => {
					setNome(e.target.value);
				}}
			/>
			<button onClick={onUpdate}>Update</button>
			<button onClick={onDelete}>Delete</button>
		</div>
	);
};
