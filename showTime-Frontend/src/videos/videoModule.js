import React, { useState, useReducer, useEffect } from "react";
import '../App.css';
import "../css/global.css"
import Card from "./videoCard.js";
import axios from "axios";

function App() {
	const [movieData, handleMovies] = useState([])
	useEffect(() => {
		async function fetchMovies() {
			const ret = await axios.get("http://localhost:8080/video/getAllVideos");
			handleMovies(ret.data)
			/*var res = await fetch("movieData.json");
			let data = JSON.parse(await res.text())
			handleMovies(data)*/
		}
		fetchMovies();

	}, [])

	return (
		<div>
			<div className="movieContainer flex flex-wrap justify-start w-full mt-10">
				{
					movieData.map((movie) => {
						return <Card movie={movie} />
					})
				}
			</div>
		</div>
	);
}

export default App;
