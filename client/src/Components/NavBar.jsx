import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { selectedUser, fetchMe, logoutUser } = useAuth();
  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div class="flex justify-evenly items-center bg-slate-700 mb-6">
      {selectedUser.username === "Guest" ? (
        <>
          <Link to="/login">Login</Link>
        </>
      ) : null}

      {selectedUser.username !== "Guest" ? (
        <>
          <button
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
          >
            Logout
          </button>{" "}
        </>
      ) : null}
    </div>
  );
}
