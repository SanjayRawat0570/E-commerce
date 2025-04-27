import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import krishnaji from "../assets/krishnaji.jpg";
export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex   items-center">
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <span className="rounded-full border p-1 text-sm"></span>
          <Link to="/" className=" "></Link>
        </div>
        <ul className="flex items-center text-sm font-medium">
          <li className="mr-10">
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li className="mr-10">
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
          <li className="mr-6">
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </li>

          {user ? (
            <>
              <li className="mr-6">
                <Link to="/profile" className="hover:text-gray-300">Profile</Link>
              </li>
              <li>
                <img
                  src={ krishnaji }
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-teal-500 rounded-md hover:bg-gray-100 transition"
              >
                Login / Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
