import { useEffect, useState } from "react";
import "../css/videoDisplay.css"
import DashboardModule from "../dashboard/dashboardModule";
import axios from "axios";

export default function VideoDisplayModule() {
    const [videoData, handleVideoData] = useState({})
    useEffect(() => {
        async function getVideo() {
            try {
                const queryParams = new URLSearchParams(window.location.search)
                const id = queryParams.get("id");
                const res = await axios.get(`http://localhost:8080/video/getVideo?id=${id}`);
                res.data.genre = JSON.parse(res.data.genre)
                handleVideoData(res.data)
                console.log(res.data)
            }
            catch (err) {
                window.open("/video?category=movie", "_self")
            }
        }
        getVideo()
    }, [])
    return (
        <div className="w-full text-white bg-black h-full">
            <DashboardModule />
            {Object.keys(videoData).length > 0 ?
                <div className="translate-y-24 pl-8 pr-8 bg-black">
                    <video poster={"images/" + videoData.posterPath} className="w-full videoContainer" controls>
                        <source src={"videos/" + videoData.videoPath}></source>
                    </video>
                    <p className="text-5xl text-appRedColor mt-5">{videoData.name}</p>
                    <div className="mt-3">
                        {
                            videoData.genre ?
                                videoData.genre.map((genre) => {
                                    return <p className="text-md">{genre} </p>
                                }) :
                                <p></p>
                        }
                    </div>
                    <p className="mt-2">{videoData.description}</p>
                </div> :
                <div></div>
            }
        </div>
    );
}