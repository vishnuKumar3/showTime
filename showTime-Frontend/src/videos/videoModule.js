import React, { useState, useReducer, useEffect } from "react";
import Card from "./videoCard.js";
import axios from "axios";
import DashboardModule from "../dashboard/dashboardModule.js";
import { Carousel } from 'antd';

function App() {
	const [movieData, handleMovies] = useState([])
	useEffect(() => {
		async function fetchMovies() {
			const queryParams = new URLSearchParams(window.location.search)
			try {
				const category = queryParams.get("category").toLowerCase()
				const ret = await axios.get(`http://localhost:8080/video/getAllVideos?category=${category}`);
				console.log(ret)
				handleMovies(ret.data)
				/*var res = await fetch("movieData.json");
				let data = JSON.parse(await res.text())
				handleMovies(data)*/
			}
			catch (err) {
				window.open("/video?category=movie", "_self")
			}
		}
		fetchMovies();

	}, [])
	const posterData = ["Image1.png", "Image2.png", "Image3.png", "Image4.png"]

	return (
		<div class="bg-black">
			<DashboardModule />
			<div className=" bg-black w-full translate-y-20 pb-20 flex flex-col space-y-8">
				<Carousel className="border-0 mt-8" autoplay>
					{
						posterData.map((imageSrc) => {
							return <div className="w-full h-96">
								<div className="w-full h-full flex justify-center">
									<img className="w-3/4 h-full" src={"images/posters/" + imageSrc} />
								</div>
							</div>
						})
					}
				</Carousel>
				<div className="movieContainer flex flex-wrap justify-start w-full">
					{
						movieData.map((movie) => {
							return <Card movie={movie} />
						})
					}
				</div>
			</div>
		</div>
	);
}

export default App;
