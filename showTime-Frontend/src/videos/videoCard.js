import { useEffect } from "react"
import '../css/videoCard.css'

export default function Card(props) {
	const movie = props.movie
	useEffect(() => {
		let buttonElements = Array.from(document.getElementsByClassName("infoButton"))
		buttonElements.map((element) => {
			element.addEventListener("mouseover", function () {
				element.parentNode.parentNode.children[2].style.display = "flex";
			})
		})
		buttonElements.map((element) => {
			element.addEventListener("mouseout", function () {
				element.parentNode.parentNode.children[2].style.display = "none";
			})
		})

	}, [])
	return (
		<>
			<div className='movieCard z-10 ml-5 mr-5 mb-10'>
				<div className="flex justify-end m-0 p-0">
					<img src="images/info.png" className="m-0 p-0 cursor-pointer w-5 h-5 infoButton" />
				</div>
				<video poster={"images/" + movie.posterPath} className="rounded-lg video p-0 m-0 border-0" controls>
					<source src={"videos/" + movie.videoPath} className="border-0">
					</source>
				</video>
				<div className='rounded-lg flex justify-center items-center flex-col movieSummary h-full text-center w-full border-0 text-white'>
					<p className="text-2xl font-normal">{movie.name}</p>
					<p>{movie.shortSummary}
					</p>
				</div>
			</div>
		</>
	);
}
