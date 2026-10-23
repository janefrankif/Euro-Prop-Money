export type Denomination = 5 | 10 | 20 | 50 | 100 | 200 | 500 | 'mixed';

export type PrintType = '2-sided' | '1-sided';
export type FinishType = 'crisp-vault' | 'weathered-stunt' | 'aged-crime';
export type ProductCategory = 'stack' | 'bag' | 'case' | 'bundle';

export interface ProductCompliance {
  standard: string;
  markings: string;
  scale: string;
  paperGrade: string;
}

export interface ProductSpecifications {
  dimensions: string;
  weight: string;
  packaging: string;
  cameraSuitability: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  denomination: Denomination;
  faceValue: string;
  price: number;
  category: ProductCategory;
  printType: PrintType;
  finish: FinishType;
  billsPerUnit: number;
  compliance: ProductCompliance;
  image: string;
  tag?: string;
  description: string;
  specifications: ProductSpecifications;
  inStock: boolean;
  shipsIn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPrintType: PrintType;
  selectedFinish: FinishType;
}

export interface DiscountTier {
  minQuantity: number;
  discountPercent: number;
  label: string;
  badge: string;
}

export interface StudioOrderQuote {
  productionTitle: string;
  propMaster: string;
  studioEmail: string;
  shootDate: string;
  vatNumber: string;
  projectCode: string;
  shippingOption: 'standard' | 'express_courier' | 'same_day_set';
}
