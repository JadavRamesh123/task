import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function Navbar() {

    const { currentUser } = useAuth();

    return (

        <nav>
            <Link to="/shared">
                Shared Files
            </Link>
            <h2>Collaborative Editor</h2>

            <p>{currentUser?.email}</p>

        </nav>

    );

}

export default Navbar;