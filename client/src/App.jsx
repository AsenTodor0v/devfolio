import { BrowserRouter, Route, Routes } from "react-router-dom"
import DetailPage from "./pages/DetailPage"
import ProfilePage from "./pages/ProfilePage"
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import SignUpPage from "./pages/SignUpPage"
import CreatePostPage from "./pages/CreatePostPage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect, useState } from "react"
import { getUsername } from "./services/apiBlog"



export default function Home() {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useQuery({
    queryKey: ['username'],
    queryFn: getUsername,
  })

  useEffect(function () {
    if (data) {
      setUsername(data.username);
      setIsAuthenticated(true);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} username={username} />}>
          <Route index element={<HomePage />} />
          <Route path="blogs/:slug" element={<DetailPage username={username} isAuthenticated={isAuthenticated} />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
          <Route path="create" element={<ProtectedRoute><CreatePostPage isAuthenticated={isAuthenticated} /></ProtectedRoute>} />
          {/*<Route path="profile" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
