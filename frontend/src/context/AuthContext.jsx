import { createContext, useContext, useReducer} from "react";
import API from "../services/api";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
      };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_USER":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const register = async (fullName, email, password, role) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await API.post("/auth/register", {
        fullName,
        email,
        password,
        role,
      });

      // Save to localStorage so auth persists on page refresh
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // Login user
  const login = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
      return { success: true, roles: data.data.user.roles };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // Update user in context after profile edit
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        updateUser,
        isLoggedIn: !!state.token,
        isSeller: state.user?.roles?.includes("seller"),
        isBuyer: state.user?.roles?.includes("buyer"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component
export const useAuth = () => useContext(AuthContext);