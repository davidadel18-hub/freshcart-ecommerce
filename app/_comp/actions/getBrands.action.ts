"use server";

export async function GetBrands() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/brands`,
    {
      method: "GET",
    }
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to get brands");
  }

  return payload;
}