import React from 'react';
import firebase from '../firebase';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledBtn = styled(Button)({
	margin: '0 0.5em'
});

function SimpleCard({ studio }) {
	const [ nome, setNome ] = React.useState(studio.nome);
	const [ city, setCity ] = React.useState(studio.city);

	const [ dipendenti, setDipendenti ] = React.useState([]);

	React.useEffect(
		() => {
			const fetchData = async () => {
				const db = firebase.firestore();

				const dip = await db.collection('studi').doc(studio.id).collection('dipendenti').get();
				setDipendenti(dip.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			};

			fetchData();
		},
		[ studio ]
	);

	const onUpdate = () => {
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).set({ ...studio, nome, city });
	};

	const onDelete = () => {
		const db = firebase.firestore();
		db.collection('studi').doc(studio.id).delete();
	};

	return (
		<div className="card">
			<TextField
				placeholder="nome"
				value={nome}
				label="nome"
				onChange={(e) => {
					setNome(e.target.value);
				}}
			/>

			<TextField
				placeholder="city"
				value={city}
				label="city"
				onChange={(e) => {
					setCity(e.target.value);
				}}
			/>

			<StyledBtn variant="contained" color="primary" onClick={onUpdate}>
				Update
			</StyledBtn>
			<StyledBtn variant="contained" color="secondary" onClick={onDelete}>
				Delete
			</StyledBtn>

			{dipendenti.map((dip, i) => <div key={i}>{dip.nome}</div>)}
		</div>
	);
}

export default SimpleCard;
