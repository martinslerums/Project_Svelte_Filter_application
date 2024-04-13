import type { PageLoad } from './$types';
import type {Game, Retention } from '$lib/types';

export const load = (async ({ fetch }) => {

	const gamesApiResponse = await fetch(
		'https://storage.googleapis.com/estoty-temp/games.json'
		);
	const games: Game [] = await gamesApiResponse.json();

	const retentionApiResponse = await fetch(
		'https://storage.googleapis.com/estoty-temp/retention.json'
	);
	const retentions: Retention [] = await retentionApiResponse.json();
	
	
	return { games, retentions };
	
}) satisfies PageLoad;