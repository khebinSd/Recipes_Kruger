import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipesId } from "../api/RecipesApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DetailsRecipies() {
	const params = useParams();
	const [infos, setInfos] = useState([]);
	const [hasId, setHasId] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (verifyId(params.id)) fetchInfo(params.id);
		else getInfo(params.id);
	}, [params.id]);

	const verifyId = (id) => {
		const apiRecipes = JSON.parse(localStorage.getItem("apiRecipes"));
		const apiId = apiRecipes
			.map((recipe) => recipe.uri.split("_", 2)[1])
			.includes(id);
		const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
		let savedId = true;
		if (savedRecipes !== null)
			savedId = savedRecipes
				.map((recipe) => recipe.uri.split("_", 2)[1])
				.includes(id);
		if (savedId && apiId) {
			setHasId(true);
			return true;
		} else if (apiId) {
			setHasId(true);
			return true;
		} else {
			setHasId(false);
			return false;
		}
	};

	const fetchInfo = async (id) => {
		const info = await getRecipesId(id);
		setInfos(info);
		checkSavedRecipes(info);
	};

	const getInfo = (id) => {
		const temp = JSON.parse(localStorage.getItem("myRecipes"));
		setInfos(temp.find((recipe) => recipe.id === id));
	};

	const checkSavedRecipes = (info) => {
		let saveRecipeInfo = [];
		let temp = localStorage.getItem("savedRecipes");
		if (temp === null) localStorage.setItem("savedRecipes", "[]");
		else {
			saveRecipeInfo = JSON.parse(temp);
			let mapSearch = saveRecipeInfo.map((data) => data.label);
			if (mapSearch.includes(info.label)) setIsSaved(true);
			else {
				setIsSaved(false);
				return saveRecipeInfo;
			}
		}
	};

	const handleSave = () => {
		let saveRecipeInfo = checkSavedRecipes(infos);
		if (!isSaved) {
			saveRecipeInfo.push(infos);
			localStorage.setItem("savedRecipes", JSON.stringify(saveRecipeInfo));
			setIsSaved(true);
			Swal.fire({
				title: "Good job!",
				icon: "success",
				text: "Recipe saved successfully",
			});
		}
	};

	const handleReturn = () => {
		navigate("/home");
	}

	return (
		<>
			<Navbar />
			<div className="flex items-center justify-center w-full min-h-screen">
				<div className="flex flex-col w-full max-w-4xl xl:p-10 space-y-6 text-white bg-white shadow-lg max-sm:bg-none max-sm:shadow-none md:flex-row md:space-x-6 md:space-y-0 rounded-xl  max-sm:my-5">
					<div className="flex flex-col p-8 space-y-8 text-gray-600 shadow-lg rounded-xl max-sm:w-80 max-sm:mx-5">
						<div className="my-5">
							{hasId ? (
								<h3 className="text-lg font-bold">{infos.label}</h3>
							) : (
								<h3>{infos.title}</h3>
							)}
						</div>
						<div className="flex justify-center">
							<img
								src={infos.image}
								alt=""
								className="mask mask-squircle w-56"
							/>
						</div>
						<div className="py-10">
							<div className="flex flex-row gap-2">
								<p>Porciones: </p>
								{hasId ? <p>{infos.yield}</p> : <p>{infos.servings}</p>}
							</div>
							<div className="flex flex-row gap-2">
								<p >Tipo de Cocina: </p>
								<p>{infos.cuisineType}</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>Tipo de Comida: </p>
								<p>{infos.mealType}</p>
							</div>
							<div className="flex flex-row gap-2">
								<p>Calorias: </p>
								<p>{infos.calories}</p>
							</div>
						</div>
					</div>
					<div className="w-12/12 p-8 text-gray-600 bg-white shadow-lg rounded-xl max-sm:w-80 max-sm:mx-5">
						<div className="flex flex-col space-y-4">
							<div className="flex justify-center border-b-2">
								<h1 className="my-2 text-lg font-bold">Details</h1>
							</div>
							<div className="flex flex-row space-x-3">
								<p>Author: </p>{" "}
								{hasId ? <p> {infos.source} </p> : <p>{infos.author}</p>}
							</div>
							<div>
								{hasId && (
									<p>
										Ver receta completa <a href={infos.url}>aqui</a>
									</p>
								)}
							</div>
							<div className="divider"></div>
							<div>
								{hasId ? (
									<>
										<p className="mx-2 mb-2">Ingredients: </p>
										<ul>
											{infos.ingredients?.map((recipe, index) => (
												<li className="list-disc list-inside" key={index}>
													{recipe.text}
												</li>
											))}
										</ul>
									</>
								) : (
									<p>{infos.ingredients}</p>
								)}
								<div className="divider"></div>
								{!isSaved && hasId && (
									<div className="flex justify-end mt-5 gap-2">
										<button className="btn btn-info w-50 max-sm:text-xs" onClick={handleSave}>
											Agregar a mis recetas
										</button>
										<button className="btn btn-success max-sm:text-xs" onClick={handleReturn}>Volver</button>
									</div>
								)}
							</div>
							<div>
								{!hasId && (
									<Link to={`/editRecipe/${infos.id}`}>
										<button>Edit Recipe</button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* 

				{hasId ? (
					<ul>
						{infos.ingredients?.map((recipe, index) => (
							<li key={index}>{recipe.text}</li>
						))}
					</ul>
				) : (
					<p>{infos.ingredients}</p>
				)}
				{!isSaved && hasId && (
					<button onClick={handleSave}>Agregar a mis recetas</button>
				)}
				{!hasId && (
					<Link to={`/editRecipe/${infos.id}`}>
						<button>Edit Recipe</button>
					</Link>
				)} */}
			</div>
			<Footer />
		</>
	);
}
