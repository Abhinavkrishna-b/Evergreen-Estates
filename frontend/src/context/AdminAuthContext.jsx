import { createContext, useContext, useReducer } from "react";
import API from "../services/api";

const AdminAuthContext = createContext();

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  adminToken: localStorage.getItem("adminToken") || null,
  loading: false,
  error: null,
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        admin: action.payload.admin,
        adminToken: action.payload.token,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return { ...state, admin: null, adminToken: null, loading: false };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const adminLogin = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await API.post("/admin/login", { email, password });

      localStorage.setItem("adminToken", data.data.token);
      localStorage.setItem("admin", JSON.stringify(data.data.admin));

      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Admin login failed";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin: state.admin,
        adminToken: state.adminToken,
        loading: state.loading,
        error: state.error,
        adminLogin,
        adminLogout,
        isAdminLoggedIn: !!state.adminToken,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);