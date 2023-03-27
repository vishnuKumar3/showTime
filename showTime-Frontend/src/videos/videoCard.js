import { useEffect } from "react"
import '../css/videoCard.css'

const displayVideo = (id) => {
	window.open(`/videoDisplay?id=${id}`, "_self")
}

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
			<div onClick={() => displayVideo(movie.id)} className='movieCard z-10 ml-5 mr-5 mb-10 cursor-pointer text-white'>
				<div className="flex justify-end m-0 p-0 bg-black">
					<i class="fa fa-info-circle infoButton text-italic text-" aria-hidden="true"></i>
				</div>
				<video poster={"images/" + movie.posterPath} className="bg-black video p-0 m-0 border-0">
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
