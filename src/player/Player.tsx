import { useState } from 'react';
import { ButtonPlayer, ButtonConfirm, ButtonRestartSeason } from './Button';

const BUCKET = '3FKDpFWFYbQzmWrne2bB1x'

export const Player = (props: { name: string }) => {
	const [characters, setCharacters] = useState({
		calin: '',
		razvan: '',
		cosmin: '',
		sorin: ''
	});

	return (
		<div >
			<table>
				<tr>
					<th>
						<ButtonPlayer onClick={() => handlePlayerClick('calin', characters, setCharacters)}> Calin </ButtonPlayer>
					</th>
					<th>
						{characters.calin}
					</th>
				</tr>
				<tr>
					<td>
						<ButtonPlayer onClick={() => handlePlayerClick('razvan', characters, setCharacters)}> Razvan </ButtonPlayer>
					</td>
					<th>
						{characters.razvan}
					</th>
				</tr>
				<tr>
					<td>
						<ButtonPlayer onClick={() => handlePlayerClick('cosmin', characters, setCharacters)}> Cosmin </ButtonPlayer>

					</td>
					<th>
						{characters.cosmin}
					</th>
				</tr>
				<tr>
					<th>
						<ButtonPlayer onClick={() => handlePlayerClick('sorin', characters, setCharacters)}> Sorin </ButtonPlayer>

					</th>
					<td>
						{characters.sorin}
					</td>
				</tr>

				<tr>
					<td>
					</td>
				</tr>
				<tr>
					<td>
					</td>
				</tr>
			</table>
			<div>
			<ButtonConfirm onClick={() => handleConfirmButton(characters, setCharacters)}> Confirm </ButtonConfirm> <br />
				<ButtonRestartSeason onClick={() => handleResetSeason(setCharacters)}> Restart Season </ButtonRestartSeason>
			</div>
		</div>
	)
}

const handlePlayerClick = async (name: string, characters: any, setCharacters: any) => {
	const character = await getPlayableCharacter(name, characters);
	console.log(character)
	setCharacters({ ...characters, [name]: character });
}

const getPlayableCharacter = async (name: string, setup: any) => {
	const url = `https://kvdb.io/${BUCKET}/${name}`;
	const response = await fetch(url);
	const data = await response.text();
	const playableCharacters: string[] = data.split(',') || [];
	if (playableCharacters.length === 0) {
		return 'No characters available';
	}

	const playableCharactersFinal = playableCharacters.filter((character: string) => {
		return character !== setup.calin && character !== setup.razvan && character !== setup.cosmin && character !== setup.sorin
	})

	const randomIndex = Math.floor(Math.random() * playableCharactersFinal.length);
	
	return playableCharactersFinal[randomIndex];
}

const handleResetSeason = (resetSetup: any) => {
	const url = `https://kvdb.io/${BUCKET}/characters`;
	fetch(url)
		.then(function (response) {
			return response.text();
		}).then(function (data) {
			resetPlayer('calin', data)
			resetPlayer('cosmin', data)
			resetPlayer('razvan', data)
			resetPlayer('sorin', data)
		});
	resetSetup({
		calin: '',
		razvan: '',
		cosmin: '',
		sorin: ''
	})

}

const resetPlayer = (player: string, data: string) => {
	const url = `https://kvdb.io/${BUCKET}/${player}`;
	fetch(url,
		{
			method: 'Post',
			body: data
		})
}

const handleConfirmButton = (setup: any, resetSetup: any) => {
	removeCharacterForPlayer('calin', setup.calin)
	removeCharacterForPlayer('razvan', setup.razvan)
	removeCharacterForPlayer('cosmin', setup.cosmin)
	removeCharacterForPlayer('sorin', setup.sorin)
	resetSetup({
		calin: '',
		razvan: '',
		cosmin: '',
		sorin: ''
	})
}

const removeCharacterForPlayer = async (name: string, playedCharacter: string) => {
	const url = `https://kvdb.io/${BUCKET}/${name}`;
	const response = await fetch(url);
	const data = await response.text();
	const allCharacters: string[] = data.split(',') || [];

	const filiteredCharacters = allCharacters.filter((character: string) => {
		return character !== playedCharacter
	})

	resetPlayer(name, filiteredCharacters.join(','))
}

