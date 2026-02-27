import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import BrowseNeeds from './pages/needs/BrowseNeeds'
import PostNeed from './pages/needs/PostNeed'
import NeedDetail from './pages/needs/NeedDetail'
import Dashboard from './pages/admin/Dashboard'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="needs" element={<BrowseNeeds />} />
            <Route path="needs/post" element={<PostNeed />} />
            <Route path="needs/:id" element={<NeedDetail />} />
            <Route path="admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
