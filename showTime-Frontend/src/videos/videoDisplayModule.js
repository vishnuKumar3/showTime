import { useEffect, useState } from "react";
import "../css/videoDisplay.css"
import { message, Button } from "antd"
import DashboardModule from "../dashboard/dashboardModule";
import axios from "axios";
import { socket } from "../socket.js"

export default function VideoDisplayModule() {
    const [videoData, handleVideoData] = useState({})
    const [loading, handleLoading] = useState(false);

    function handleButtonClick() {
        handleLoading(true)
        setTimeout(() => {
            handleLoading(false)
        }, 500)
    }

    function addMessageToChatBox(message) {
        document.getElementsByClassName("messageBoxHolder")[0].scrollTop = 0
    }

    const sendMessage = () => {
        var msg = window.prompt("enter message:");
        socket.emit("message", msg)
        handleButtonClick()
        document.getElementsByClassName("messageBox")[0].innerHTML += `<div class="w-full flex justify-end pb-2"><div class="bg-white text-black rounded-md pl-3 pr-3">${msg}</div></p>`;
        addMessageToChatBox()
    }
    const createRoom = () => {
        var room = window.prompt("enter room no:")
        socket.emit("createRoom", room)
        message.success("room created successfully", 1)
    }
    const joinRoom = () => {
        var room = window.prompt("enter room no:")
        socket.emit("joinRoom", room)
    }

    useEffect(() => {
        socket.on("connect", function () {
            console.log("connected");
        })
        socket.on("reply", function (msg) {
            document.getElementsByClassName("messageBox")[0].innerHTML += `<div class="w-full flex justify-start pb-2"><div class="bg-white text-black rounded-md pl-3 pr-3">${msg}</div></p>`;
            addMessageToChatBox()
        })
        socket.on("error", function (data) {
            message.info(data, 2)
        })
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
                <div className="translate-y-24 pl-8 pr-8 bg-black pb-10">
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
                    <div className="mt-10 p-0 flex flex-col h-max rounded-lg border-0">
                        <p className="text-appRedColor text-2xl mb-3">Now you can experience out chatting feature !!</p>
                        <div className="flex w-full">
                            <Button onClick={sendMessage} className="mr-3 text-lg pb-8 text-white" style={{ background: "#E50914" }} type="primary" danger loading={loading}>
                                Send message
                            </Button>
                            <Button onClick={createRoom} className="mr-3 text-lg pb-8 text-white" style={{ background: "#E50914" }} type="primary" danger>
                                Create Room
                            </Button>
                            <Button onClick={joinRoom} className="text-lg pb-8 text-white" style={{ background: "#E50914" }} type="primary" danger>
                                Join Room
                            </Button>
                        </div>
                        <div className="messageBoxHolder overflow-y-scroll p-2 mt-3 rounded-lg border-1 border-gray-500 h-96 flex flex-col-reverse">
                            <div className="messageBox h-max flex flex-col">

                            </div>
                        </div>
                    </div>
                </div> :
                <div></div>
            }
        </div>
    );
}