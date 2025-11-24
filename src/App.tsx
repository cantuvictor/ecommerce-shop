import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Todos os caminhos de importação locais foram corrigidos para usar o alias "@/"
import Login from "@/cases/auth/components/login";
import Register from "@/cases/auth/components/register";
import ProductLayout from "@/cases/products/components/product-layout";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/cases/cart/context/cart-context";
import { Cart } from "@/cases/cart/components/cart";
import { PublicRoute } from "@/cases/auth/guards/public-route";
import { ProtectedRoute } from "@/cases/auth/guards/protected-route";
import { AccountLayout } from "@/cases/account/components/account-layout-";
import { FavoriteLayout } from "@/cases/favorites/components/favorite-layout";

function App() {
 const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";
  const token = JSON.parse(localStorage.getItem("user")!)?.token;

  return (
    <CartProvider>
      {/* ESTILIZAÇÃO MANTIDA: Define o layout principal para preencher a tela (min-h-screen)
          e ser um container flexível vertical (flex flex-col) para que o main cresça.
          Cor de fundo global levemente cinza (bg-gray-50) para profundidade. */}
      <div className="min-h-screen flex flex-col bg-gray-50"> 
        {!isLoginPage && <Header />}

        {/* ESTILIZAÇÃO MANTIDA: Faz o main ocupar o espaço restante (flex-grow),
          centraliza o conteúdo em uma largura máxima (max-w-7xl mx-auto) e adiciona padding. */}
        <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/products" element={
              <ProtectedRoute>
                <ProductLayout />
              </ProtectedRoute>
            } />

            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="/account" element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            } />

            <Route path="/favorites" element={
              <ProtectedRoute>
                <FavoriteLayout />
              </ProtectedRoute>
            } />

            <Route path="*" element={
              <Navigate to={token ? "/products" : "/login"} replace />
            } />
          </Routes>
        </main>

        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;