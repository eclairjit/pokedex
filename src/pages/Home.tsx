import { useEffect, useState } from "react";
import { SearchBox } from "../components/ui/SearchBox";
import { HoverEffect } from "../components/ui/CardHoverEffect";
import { fetchPokemons } from "../api";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const [searchField, setSearchField] = useState("");

	const pokemons = useStore((state: any) => state.pokemons);
	const setPokemons = useStore((state: any) => state.setPokemons);

	const getPokemonsForHomepage = async () => {
		if (pokemons.length > 0) return;

		const data: Array<{ name: string; url: string; id: number }> =
			await fetchPokemons();

		setPokemons(data);

		console.log(pokemons);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchField(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTimeout(
			() => navigate(`/pokemon/${searchField.trim().toLowerCase()}`),
			1000
		);
	};

	useEffect(() => {
		getPokemonsForHomepage();
	}, []);

	return (
		<div className="w-screen">
			{/* logo */}

			<div className="w-full flex justify-center my-10">
				<img
					src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
					alt="pokedex logo"
					className="max-w-60 md:min-w-96"
				/>
			</div>

			{/* search box */}

			<div className="mt-10">
				<SearchBox onChange={handleChange} onSubmit={handleSubmit} />
			</div>

			{/* pokemon cards */}

			<HoverEffect items={pokemons} />
		</div>
	);
};

export default Home;
