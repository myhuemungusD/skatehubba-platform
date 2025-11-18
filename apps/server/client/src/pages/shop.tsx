import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import Navigation from "../components/Navigation";
import { Package, Shirt, Award, Loader2, ShoppingBag } from "lucide-react";
import AddToCartButton from "../components/cart/AddToCartButton";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/../../shared/schema";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Icon mapping for products
const ICON_MAP = {
  Shirt,
  Package,
  Award,
} as const;

export default function ShopPage() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = products ? [...new Set(products.map(p => p.category).filter((c): c is string => c !== null))] : [];
  const productCount = products?.length || 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingBag className="w-12 h-12 text-[#ff6a00]" />
            <h1 className="text-5xl font-bold text-[#ff6a00]">
              HubbShop
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            Gear up. Wax on. Look fresh.
          </p>
          {productCount > 0 && (
            <Badge className="bg-success/20 text-success border-success/30 text-sm px-4 py-1">
              {productCount} Products Available
            </Badge>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#ff6a00] animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load products. Please try again.</p>
          </div>
        )}

        {products && products.length > 0 && (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-xl mx-auto mb-8" style={{ gridTemplateColumns: `repeat(${categories.length + 1}, 1fr)` }}>
              <TabsTrigger value="all" className="data-[state=active]:bg-[#ff6a00] data-[state=active]:text-black">
                All ({productCount})
              </TabsTrigger>
              {categories.map(category => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-[#ff6a00] data-[state=active]:text-black capitalize"
                  >
                    {category} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                  const Icon = product.icon && product.icon in ICON_MAP 
                    ? ICON_MAP[product.icon as keyof typeof ICON_MAP]
                    : Package;
                  const iconColor = index % 3 === 0 ? "text-[#ff6a00]" : index % 3 === 1 ? "text-success" : "text-[#ff6a00]";
                  const isNew = index < 3; // Mark first 3 as "new"

                  return (
                    <Card 
                      key={product.id} 
                      className="bg-neutral-900 border-neutral-700 hover:border-[#ff6a00] transition-all hover:scale-[1.02]" 
                      data-testid={`card-product-${product.id}`}
                    >
                      <CardHeader>
                        <div className="relative w-full h-48 bg-neutral-800 rounded-lg flex items-center justify-center mb-4">
                          <Icon className={`w-20 h-20 ${iconColor}`} />
                          {isNew && (
                            <Badge className="absolute top-2 right-2 bg-orange-500 text-white border-0">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-white">{product.name}</CardTitle>
                        <CardDescription className="text-gray-400">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-success">
                            ${(product.price / 100).toFixed(2)}
                          </span>
                          <AddToCartButton 
                            id={product.productId}
                            name={product.name}
                            price={product.price / 100}
                            quantity={1}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === category).map((product, index) => {
                    const Icon = product.icon && product.icon in ICON_MAP 
                      ? ICON_MAP[product.icon as keyof typeof ICON_MAP]
                      : Package;
                    const iconColor = index % 3 === 0 ? "text-[#ff6a00]" : index % 3 === 1 ? "text-success" : "text-[#ff6a00]";

                    return (
                      <Card 
                        key={product.id} 
                        className="bg-neutral-900 border-neutral-700 hover:border-[#ff6a00] transition-all hover:scale-[1.02]" 
                        data-testid={`card-product-${product.id}`}
                      >
                        <CardHeader>
                          <div className="w-full h-48 bg-neutral-800 rounded-lg flex items-center justify-center mb-4">
                            <Icon className={`w-20 h-20 ${iconColor}`} />
                          </div>
                          <CardTitle className="text-white">{product.name}</CardTitle>
                          <CardDescription className="text-gray-400">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-success">
                              ${(product.price / 100).toFixed(2)}
                            </span>
                            <AddToCartButton 
                              id={product.productId}
                              name={product.name}
                              price={product.price / 100}
                              quantity={1}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            More items coming soon. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
