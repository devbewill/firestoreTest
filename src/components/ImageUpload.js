import React, { useState } from 'react';
import firebase from '../firebase';

const storage = firebase.storage();

function ImageUpload({ logo, setLogo }) {
	const [ image, setImage ] = useState(null);
	const [ progress, setProgress ] = useState(0);

	const handleUpload = (e) => {
		e.preventDefault();
		const uploadTask = storage.ref(`logos/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// progrss function ....
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				setProgress(progress);
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref('logos').child(image.name).getDownloadURL().then((logo) => {
					setLogo(logo);
					setProgress(0);
				});
			}
		);
	};

	return (
		<React.Fragment>
			<div>
				<input
					type="file"
					onChange={(e) => {
						e.preventDefault();
						setImage(e.target.files[0]);
					}}
				/>

				<div className="progressWrapper">
					<progress className="progressBar" value={progress} max="100" />
					<button className="upload" onClick={handleUpload}>
						Upload
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ImageUpload;
