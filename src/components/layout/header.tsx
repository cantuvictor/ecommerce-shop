import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/cases/cart/context/cart-context";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


export function Header() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    clearCart();
    navigate("/login");
  };

  return (
    <header className="w-full bg-blue-800 border-b border-blue-700 shadow-lg sticky top-0 z-50 text-white">
      <div className="flex items-center px-6 py-4 gap-10">
        <Link to="/products" className="text-2xl font-extrabold text-white hover:text-blue-200 transition-colors ml-12">
          Nutri Alimentos
        </Link>

        <div className="flex flex-row gap-10">
          <Button variant="outline"
                  className="relative flex items-center gap-2 cursor-pointer w-15 bg-blue-700 text-white hover:bg-blue-600 hover:text-white border-blue-600"
                  onClick={() => navigate("/cart")}>
            <ShoppingCart className="w-8 h-8" />

            {
              totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-blue-800">
                  {totalItems}
                </span>
              )
            }
          </Button>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white">
                  <Apple className="w-6 h-6" />
                </NavigationMenuTrigger>

                <NavigationMenuContent className="p-2 w-32 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <NavigationMenuLink asChild>
                    <Button variant="ghost"
                            className="w-full justify-start text-left text-gray-800 hover:bg-blue-50/50 hover:text-blue-700"
                            onClick={() => navigate('/account')}>
                      Conta
                    </Button>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Button variant="ghost"
                            className="w-full justify-start text-left text-gray-800 hover:bg-blue-50/50 hover:text-blue-700"
                            onClick={() => navigate('/favorites')}>
                      Favoritos
                    </Button>
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink asChild>
                    <Button variant="ghost"
                            className="w-full justify-start text-left text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={handleLogout}>
                      Sair
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}