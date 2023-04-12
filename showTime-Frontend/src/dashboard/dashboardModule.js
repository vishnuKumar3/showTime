import "../css/dashboard.css";
import { useCookies } from "react-cookie";

const logout = (removeCookie) => {
    removeCookie("authorization")
    window.open("/signIn", "_self")
}

export default function DashboardModule() {
    const [cookies, setCookie, removeCookie] = useCookies()
    return (
        <div className="w-full bg-black z-10 mb-32 fixed navigationBar flex justify-between items-center">
            <div>
                <a className="dashboardLink" href="/">home</a>
                <a className="dashboardLink" href="/video?category=movie">Movies</a>
                <a className="dashboardLink" href="/video?category=tvshow">TvShows</a>
                <a className="dashboardLink" href="/video?category=webisode">Webisodes</a>
            </div>
            <div>
                <button onClick={() => logout(removeCookie)} className="dashboardLink">Logout</button>
            </div>
        </div>
    );
}