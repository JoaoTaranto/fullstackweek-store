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
  LandmarkIcon,
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
    <div className="max-w-[1440px]flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <LayoutDashboardIcon size={18} />
        Dashboard
      </Badge>

      <div className="flex w-full flex-col gap-10 p-10">
        <div className="flex w-full flex-row justify-center gap-10 p-10">
          <Card className="w-[510px] border-none bg-gradient-to-r from-[#36393C99] to-[#36393C3D]">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row gap-2 text-xs font-normal text-white">
                  <LandmarkIcon size={18} />
                  Total de Receitas:
                </div>
              </CardTitle>
              <CardDescription className="text-2xl font-bold text-white">
                R$20.000,00
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="w-[510px] border-none bg-gradient-to-r from-[#36393C99] to-[#36393C3D]">
            <CardHeader>
              <CardTitle>
                <div className="flex flex-row gap-2 text-xs font-normal text-white">
                  <CircleDollarSignIcon size={18} />
                  Receita Hoje:
                </div>
              </CardTitle>
              <CardDescription className="text-2xl font-bold text-white">
                R$600,00
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex w-full flex-row justify-center gap-10 p-10">
          {" "}
          {/* REVISAR BUG RESPONSIVIDADE */}
          <Card className="w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <CircleDollarSignIcon size={18} className="text-primary" />
                <p className="text-lg font-bold text-white ">1100</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-base">
                Total de Vendidos
              </p>
            </CardContent>
          </Card>
          <Card className="w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <ShoppingBasketIcon size={18} className="text-primary" />
                <p className="text-lg font-bold text-white ">{orders.length}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-base">
                Total de Pedidos
              </p>
            </CardContent>
          </Card>
          <Card className="w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <PackageIcon size={18} className="text-primary" />
                <p className="text-lg font-bold text-white ">
                  {products.length}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-base">
                Produtos
              </p>
            </CardContent>
          </Card>
          <Card className="w-[235px]">
            <CardHeader>
              <CardDescription className="flex items-center justify-center gap-2">
                <ListOrderedIcon size={18} className="text-primary" />
                <p className="text-lg font-bold text-white ">
                  {categories.length}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex flex-col justify-center text-center text-base">
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
