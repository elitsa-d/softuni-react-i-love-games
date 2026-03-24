import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate("/");
  }, []);

  return null;
}
