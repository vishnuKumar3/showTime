import "./css/homeModule.css"
export default function Home() {
	return (
		<div id="home">
			<div id="elementHolder">
				<div id="searchHolder">
					<div id="searchBox">
						<img src="images/search1.png" />
						<span style={{ fontSize: "20px" }} className="ml-2">|</span>
						<div id="term" className="ml-2">
							Which is the best ott platform in 2023? <div id="cursor"></div>
						</div>
					</div>
				</div>
				<div id="product">
					<div id="logo">
						<img src="images/netflix.png" />
					</div>
					<div id="desc">
						Presenting you the best and most used ott platform,we bet you'll be in our trance if you use our product!!
					</div>
				</div>
			</div>
		</div>
	);
}