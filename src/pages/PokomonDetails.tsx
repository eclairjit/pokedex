import { useParams } from "react-router-dom";
import { baseImageUrl, fetchPokemonDetails } from "../api";
import { Card } from "../components/ui/CardHoverEffect";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const PokomonDetails = () => {
	const { name } = useParams();

	const [order, setOrder] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [id, setId] = useState(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPokemonDetails = async () => {
			const data = await fetchPokemonDetails((() => (name ? name : ""))());
			data.order && setOrder(data.order);
			data.height && setHeight(data.height);
			data.weight && setWeight(data.weight);
			data.id && setId(data.id);

			setLoading(false);
		};

		getPokemonDetails();
	}, []);

	return loading ? (
		<div className="w-screen h-screen flex justify-center items-center text-white">
			<Loader />
		</div>
	) : id ? (
		<div className="w-screen h-screen flex justify-center items-center">
			<Card className="w-96 h-96">
				<div className="w-full h-full">
					<img
						src={`${baseImageUrl}/${id}.svg`}
						alt={id ? id : "pokemon image"}
						className="mx-auto w-78 h-60"
					/>
				</div>
				<div className="text-white">
					<h1 className="text-2xl font-bold text-center my-2">
						{name && name.charAt(0).toUpperCase() + name.slice(1)}
					</h1>
					<div className="flex w-full justify-around my-2">
						<p className="text-center">Order: {order}</p>
						<p className="text-center">Height: {height}</p>
						<p className="text-center">Weight: {weight}</p>
					</div>
				</div>
			</Card>
		</div>
	) : (
		<div className="w-screen h-screen flex justify-center items-center text-white">
			<Card className="w-96 h-20 flex justify-center items-center">
				No such Pokemon found!
			</Card>
		</div>
	);
};

export default PokomonDetails;
