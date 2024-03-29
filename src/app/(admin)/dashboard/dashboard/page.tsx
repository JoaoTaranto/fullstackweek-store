import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prismaClient } from "@/lib/prisma";
import {
  CircleDollarSignIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";

const DashboardPage = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const sold = await prismaClient.order.findMany({
    where: {
      status: "PAYMENT_CONFIRMED",
    },
  });

  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <LayoutDashboardIcon size={18} />
        Dashboard
      </Badge>

      <div className="flex w-full flex-col gap-10 p-10">
        <div className="flex w-full flex-col gap-5 p-10">
          <h1>DIV RECEITA!!!</h1>
        </div>
        <div className="flex w-full flex-row justify-center gap-10 p-10">
          {" "}
          {/* REVISAR BUG RESPONSIVIDADE */}
          <Card className="max-w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <CircleDollarSignIcon size={18} className="text-primary" />
                <p className="font-bold text-white">{sold.length}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-sm">
                Total de Vendidos
              </p>
            </CardContent>
          </Card>
          <Card className="max-w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <ShoppingBasketIcon size={18} className="text-primary" />
                <p className="font-bold text-white">{orders.length}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-sm">
                Total de Pedidos
              </p>
            </CardContent>
          </Card>
          <Card className="max-w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <PackageIcon size={18} className="text-primary" />
                <p className="font-bold text-white">{products.length}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-sm">
                Produtos
              </p>
            </CardContent>
          </Card>
          <Card className="max-w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <ListOrderedIcon size={18} className="text-primary" />
                <p className="font-bold text-white">{categories.length}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-sm">
                Categorias
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row gap-10 p-10">
          <Card>
            <CardHeader>
              <CardDescription>
                <p className="text-sm font-bold text-white">
                  Produtos Mais Vendidos
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
