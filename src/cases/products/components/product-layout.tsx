import { useProducts } from "../hooks/use-product";
import { useCategories } from "@/cases/categories/hooks/use-category";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ProductLayout() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categoriesData = [] } = useCategories();

  const categories = Array.isArray(categoriesData)
    ? categoriesData.filter((category) => category && category.id != null && String(category.id).trim() !== "")
    : [];

  const [selectedCategory, setSelectedCategory] = useState<string>("All"); 
  const [searchTerm, setSearchTerm] = useState("");
  if (isLoading) return <p>Carregando produtos...</p>;
  
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" ? true : String(product.category?.id) === selectedCategory;

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || (product.description?.toLowerCase().includes(query) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full"> 
        
        {/* ALTERADO: Combina título e filtros em um bloco de destaque com fundo, arredondamento maior e sombra (shadow-lg) */}
        <header className="mb-8 space-y-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            
            {/* Título Principal: Maior e usando a cor primária (vinho) */}
            <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
              Catálogo de Produtos
            </h1>
            
            {/* FILTROS: Reorganiza os filtros abaixo do título com separador e usa flexbox para layout responsivo */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 pt-4 border-t border-gray-100">
                
                <InputGroup className="w-full lg:flex-grow">
                    <InputGroupInput placeholder="Pesquise por nome ou descrição..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}/>

                    <InputGroupAddon>
                        <Search className="text-blue-800" />
                    </InputGroupAddon>
                </InputGroup>
                
                <Select value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-full lg:w-64">
                        <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="All">Todas as categorias</SelectItem>
                        {
                            categories.map((category) => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </header>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
                filteredProducts.length > 0 ? 
                    (filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))) 
                : 
                    (<p className="text-gray-600 text-lg col-span-full py-10 text-center border rounded-lg bg-white shadow-sm">Nenhum produto encontrado que corresponda aos filtros.</p>)
            }
      </div>
    </div>
  );
}