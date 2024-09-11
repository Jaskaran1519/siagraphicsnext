'use client'

import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            alt="Product image"
            className="w-full h-64 object-cover"
            height="400"
            src="/placeholder.svg?height=400&width=400"
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width="400"
          />
          <Badge className="absolute top-2 right-2 bg-blue-500">New</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">Modern Ergonomic Chair</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">$199.99</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Experience ultimate comfort with our ergonomic design, perfect for long work hours.
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}