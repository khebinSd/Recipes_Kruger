import { Link } from "react-router-dom";
import { RecipiesApi, searchRecipes } from "./api/RecipesApi";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Recipies() {
	const { recipes } = RecipiesApi();
	const [recipeName, setRecipeName] = useState("");
	const [infoSearch, setInfoSearch] = useState([]);
	const [validationHome, setValidationHome] = useState(true);

	useEffect(() => {
		if (recipeName === "") {
			setValidationHome(true);
		}
	}, [recipeName]);

	const handleSearch = async () => {
		if (recipeName === "") {
			alert("Please write the recipe");
		} else {
			const searchInput = await searchRecipes(recipeName);
			setValidationHome(false);
			setInfoSearch(searchInput);
		}
	};

	return (
		<>
			<Navbar />
			<div>
				<div>
					<div className="flex items-center justify-center px-2 mb-1 mt-5 sm:px-6 lg:px-2">
						<div className="relative">
							<input
								type="text"
								className="z-0 pl-5 pr-8 border-2 border-opacity-50 h-14 w-96 rounded-2xl focus:shadow focus:outline-none max-sm:w-64 max-sm:h-15"
								placeholder="Search anything..."
								value={recipeName}
								onChange={(e) => setRecipeName(e.target.value)}
							/>
							<div className="absolute top-4 right-3">
								<i
									className="z-20 text-gray-400 fa fa-search hover:text-gray-500"
									onClick={handleSearch}></i>
							</div>
						</div>
					</div>
				</div>
				<div>
					{validationHome ? (
						<>
							<div className="py-10 px-2 lg:ml-5 md:flex md:justify-center">
								<div className="grid flex-wrap grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:mx-2 max-sm:flex max-sm:justify-center 2xl:grid-cols-5 ">
									{recipes.map((receta, index) => (
										<div className="w-64 shadow-xl card bg-base-100">
											<figure className="px-10 pt-10">
												<img
													className="rounded-xl"
													src={receta.image}
													alt="1"
												/>
											</figure>
											<div className="items-center text-center card-body">
												<p className="card-title">{receta.label}</p>
												<div className="justify-center card-actions ">
													<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
														<button className="px-5 py-2 mx-5 overflow-hidden text-lg font-medium tracking-wider uppercase rounded-full shadow-md shadow-gray-400/50 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-50">
															Details
														</button>
													</Link>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</>
					) : (
						<div className="grid flex-wrap grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 max-sm:flex max-sm:justify-center 2xl:grid-cols-6 ">
							{infoSearch?.map((receta) => (
								<>
									<div className="w-56 shadow-xl card bg-base-100">
										<figure className="px-10 pt-10">
											<img className="rounded-xl" src={receta.image} alt="1" />
										</figure>
										<div className="items-center text-center card-body">
											<p className="card-title">{receta.label}</p>
											<div className="justify-center card-actions ">
												<Link to={`/details/${receta.uri.split("_", 2)[1]}`}>
													<button className="px-5 py-2 mx-5 overflow-hidden text-lg font-medium tracking-wider uppercase rounded-full shadow-md shadow-gray-400/50 bg-gradient-to-r from-blue-400 to-cyan-400 text-gray-50">
														Details
													</button>
												</Link>
											</div>
										</div>
									</div>
								</>
							))}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}
