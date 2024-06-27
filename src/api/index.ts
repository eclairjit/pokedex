import axios from "axios";

const homeApiEndPoint: string = "https://pokeapi.co/api/v2/pokemon?limit=90";

export const baseImageUrl: string =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";

const basePokemonDetailsUrl: string = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (): Promise<
	Array<{
		name: string;
		url: string;
		id: number;
	}>
> => {
	try {
		const response = await axios.get(homeApiEndPoint);

		const data = await response.data.results;

		let count: number = 0;

		const pokemons: Array<{
			name: string;
			url: string;
			id: number;
		}> = await data.map((pokemon: any) => {
			count++;

			return {
				name: pokemon.name,
				url: `${baseImageUrl}/${count}.svg`,
				id: count,
			};
		});

		return pokemons;
	} catch (error) {
		console.log(`Error in fetching pokemons. Error: ${error}`);
		return [];
	}
};

export const fetchPokemonDetails = async (name: string): Promise<any> => {
	try {
		const response = await axios.get(`${basePokemonDetailsUrl}/${name}`);

		return response.data;
	} catch (error) {
		console.log(`Error in fetching pokemon details. Error: ${error}`);
		return {};
	}
};
