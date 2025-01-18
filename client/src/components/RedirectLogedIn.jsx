import { Navigate } from "react-router-dom";

export default function RedirectLogedIn({ isAuthenticated, children }) {
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }
    return children
};