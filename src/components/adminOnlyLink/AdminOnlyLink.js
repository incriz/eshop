import { useSelector } from "react-redux";
import { selecetEmail } from "../../redux/slice/authSlice";

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selecetEmail);

  if (userEmail === "test@gmail.com") {
    return children;
  }

  return null;
};
