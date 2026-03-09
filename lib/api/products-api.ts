import { getAuthCredentials } from "@/lib/auth/credentials";

const API_BASE_URL = "http://localhost:5168/api";

// ─── Types ───────────────────────────────────────────────────────────

export interface ProductPriceResult {
  branchId: string;
  priceTypeId: string;
  price: number;
  currency: string;
}

export interface ProductDto {
  id: string;
  name: string;
  sku: string;
  barcode: string | null;
  description: string | null;
  isActive: boolean;
  categoryName: string | null;
  prices: ProductPriceResult[];
}

export interface CategoryDto {
  id: string;
  name: string;
}

export interface BranchDto {
  id: string;
  name: string;
  code: string;
}

export interface PriceTypeDto {
  id: string;
  name: string;
}

export interface CatalogBaseData {
  categories: CategoryDto[];
  branches: BranchDto[];
  priceTypes: PriceTypeDto[];
}

export interface CreateProductPayload {
  categoryId: string;
  name: string;
  sku: string;
  barcode: string;
  description: string;
  images: { imageUrl: string; isMain: boolean; displayOrder: number }[];
  prices: { priceTypeId: string; price: number; currency: string }[];
}

// ─── API Functions ───────────────────────────────────────────────────

async function authHeaders(): Promise<Record<string, string>> {
  const { authToken, tenantId } = await getAuthCredentials();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    "X-Tenant-Id": tenantId,
  };
}

/**
 * GET /api/products — Fetch all products for the current tenant.
 */
export async function fetchProducts(): Promise<ProductDto[]> {
  const headers = await authHeaders();
  const res = await fetch(`${API_BASE_URL}/products`, { headers });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch products: ${res.status} – ${errText}`);
  }

  return res.json();
}

/**
 * POST /api/products — Create a new product.
 */
export async function createProduct(payload: CreateProductPayload): Promise<{ id: string }> {
  const headers = await authHeaders();
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Failed to create product: ${res.status} – ${errText}`);
  }

  return res.json();
}

/**
 * GET /api/products/catalog-base — Fetch categories, branches, and price types.
 */
export async function fetchCatalogBase(): Promise<CatalogBaseData> {
  const headers = await authHeaders();
  const res = await fetch(`${API_BASE_URL}/products/catalog-base`, { headers });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch catalog base: ${res.status} – ${errText}`);
  }

  return res.json();
}
