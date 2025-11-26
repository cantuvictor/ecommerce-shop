import { ProductDataTable } from "@/cases/products/components/data-table/product-data-table";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";

export function FavoriteLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full">

      <header className="mb-8 space-y-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200">

        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Favoritos
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 pt-4 border-t border-gray-100">
          <InputGroup className="w-full lg:flex-grow">
            <InputGroupInput
              placeholder="Pesquise por produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon>
              <Search className="text-blue-800" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </header>

      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <ProductDataTable searchTerm={searchTerm} />
      </div>

    </div>
  );
}