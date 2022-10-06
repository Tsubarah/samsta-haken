import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    const logoutUser = async () => {
      await logout();
      navigate("/");
    };
    logoutUser();
  }, []);

  return (
    <div className="py-3 center-y">
      <p>You're being logged out</p>
    </div>
  );
};

export default LogoutPage;
