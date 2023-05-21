import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_USER) {
    return children;
  }

  return null;
};
