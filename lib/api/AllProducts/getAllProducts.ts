import { Category, Product } from "@/app/_comp/interface/ProductsInterface";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const req = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (!req.ok) {
      throw new Error(`API Error: Status ${req.status}`);
    }

    const payload = await req.json();

    return payload.data;
  } catch (error) {
    console.error("Data Fetching Error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown data layer connection failure"
    );
  }
}

export async function getSingleProduct(
  productID: string
): Promise<Product> {
  try {
    const req = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productID}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!req.ok) {
      throw new Error(`API Error: Status ${req.status}`);
    }

    const payload = await req.json();

    return payload.data;
  } catch (error) {
    console.error(
      `Data Fetching Error for Product ID ${productID}:`,
      error
    );

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown data layer connection failure"
    );
  }
}

export async function getAllCategory(): Promise<Category[]> {
  try {
    const req = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    if (!req.ok) {
      throw new Error(`API Error: Status ${req.status}`);
    }

    const payload = await req.json();

    return payload.data;
  } catch (error) {
    console.error("Data Fetching Error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown data layer connection failure"
    );
  }
}