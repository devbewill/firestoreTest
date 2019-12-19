import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StyledBtn = styled(Button)({
	margin: '0 0.5em'
});

const StyledTextField = styled(TextField)({
	margin: '0 0.5em'
});

function SimpleCard({ studio }) {
	const [ nome, setNome ] = useState(studio.nome);
	const [ city, setCity ] = useState(studio.city);

	const [ dipendenti, setDipendenti ] = useState([]);

	const [ mostraDipendenti, setMostraDipendenti ] = useState(false);

	useEffect(
		() => {
			setNome(studio.nome);
			setCity(studio.city);
			const db = firebase.firestore().collection(`studi/${studio.id}/dipendenti`);

			db.onSnapshot((snapshot) => {
				const data = [];

				snapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});

				setDipendenti(data);
			});
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
			<h2>{studio.nome}</h2>
			<div className="fields">
				<StyledTextField
					placeholder={studio.nome}
					value={nome}
					label="Nome"
					onChange={(e) => {
						setNome(e.target.value);
					}}
				/>

				<StyledTextField
					placeholder={studio.city}
					value={city}
					label="City"
					onChange={(e) => {
						setCity(e.target.value);
					}}
				/>
				<div className="action">
					<StyledBtn variant="contained" color="primary" onClick={onUpdate}>
						Update
					</StyledBtn>
					<StyledBtn variant="contained" color="secondary" onClick={onDelete}>
						Delete
					</StyledBtn>
				</div>
				<StyledBtn onClick={() => setMostraDipendenti(!mostraDipendenti)}>Mostra dipendenti</StyledBtn>
				{mostraDipendenti && (
					<div>
						<h3>Dipendenti</h3>
						{dipendenti.map((dip, i) => (
							<div key={i} className="dipendenti">
								<div className="dipendente">
									<div>
										{dip.nome} {dip.cognome}
									</div>

									<div>{dip.piva}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default SimpleCard;
