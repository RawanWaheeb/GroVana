import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/User.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);
  return token ? children : <Navigate to="/Login" />;
}
