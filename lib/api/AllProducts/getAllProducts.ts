import { Category, Product } from "@/app/_comp/interface/ProductsInterface";




export async function getAllProducts(): Promise<Product[]> {
 

  const req = await fetch(`${process.env.NEXTAUTH_URL}/api/getAllProducts`);
 const payload = await req.json();
  return payload.data;
}


export async function getSingleProduct(productID: string): Promise<Product> {
  try {
    const req = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productID}`, {
      next: { revalidate: 3600 } // Optimizes performance via Next.js caching layer
    });

    if (!req.ok) throw new Error(`API Error: Status ${req.status}`);

    const payload = await req.json();
    return payload.data; // Returns a single Product object, not an array
  } catch (error) {
    console.error(`Data Fetching Error for Product ID ${productID}:`, error);
    throw new Error(error instanceof Error ? error.message : 'Unknown data layer connection failure');
  }
}



export async function getAllCategory(): Promise<Category[]> {
  try {
    const req = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    if (!req.ok) throw new Error('Api Error')
    const payload = await req.json()
    return payload.data;
  } catch (error) {
    console.error("Data Fetching Error:", error);

    throw new Error(error instanceof Error ? error.message : 'Unknown data layer connection failure');

  }

}

