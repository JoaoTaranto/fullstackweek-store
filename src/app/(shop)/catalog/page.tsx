import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { Grid2X2 } from "lucide-react";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge variant="heading">
        <Grid2X2 size={16} />
        Catálogo
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
