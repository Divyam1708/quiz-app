import { Link } from "react-router-dom";


export default function LandingPage() {
    return(
        <div style={{fontSize:'3rem',}}>
        <Link to={'/set1'}>
            SET 1
        </Link>
        <br />
        <Link to={'/set2'}>
            SET 2
        </Link>
        </div>
    );
}