import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Utility/Spinner";
import { decrypt } from "../Utility/Encrypt";
import { Notify } from "../Utility/Notify";


const Auth = ({ isAdminComp, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userdata, isAuthenticated} = useSelector((state) => state.userData);

  const admin = localStorage.getItem('xrleadmin')?localStorage.getItem('xrleadmin'): "" ;
  const decryptedAdmin = decrypt(admin);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (isAdminComp === true && decryptedAdmin!=="admin") {
      navigate("/");
      Notify("error", "UnAuthorized Access! You don't have access to this page");
    }

  }, [dispatch,isAuthenticated, navigate, userdata, isAdminComp,decryptedAdmin]);

  return isAuthenticated || (isAuthenticated && isAdminComp) ? (
    <>{loading ? <Spinner /> : children}</>
  ) : null;          
};

export default Auth;
