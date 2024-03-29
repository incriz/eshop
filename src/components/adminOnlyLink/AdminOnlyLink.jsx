import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "rudyakov.anatoly@gmail.com") {
    return children;
  }

  return null;
};
