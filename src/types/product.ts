
import { Currency } from "./currency";

export enum ProductCategory {
  STROLLERS_AND_CARRIERS = "STROLLERS_AND_CARRIERS",
  CLOTHING_AND_SHOES = "CLOTHING_AND_SHOES",
  NURSERY_AND_FURNITURE = "NURSERY_AND_FURNITURE",
  FEEDING_AND_CARE = "FEEDING_AND_CARE",
  TOYS_AND_BOOKS = "TOYS_AND_BOOKS",
  MATERNITY_AND_MOM = "MATERNITY_AND_MOM",
  OTHER = "OTHER",
}

export enum ProductCondition {
  NEW = "NEW",
  LIKE_NEW = "LIKE_NEW",
  USED = "USED",
}

export enum AgeGroup {
  NEWBORN = "NEWBORN",
  BABY_3_12M = "BABY_3_12M",
  TODDLER_1_3Y = "TODDLER_1_3Y",
  KIDS_3_6Y = "KIDS_3_6Y",
  KIDS_6_12Y = "KIDS_6_12Y",
  MATERNITY = "MATERNITY",
}

export enum ProductSort {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
}

export const PRODUCT_CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: ProductCategory.STROLLERS_AND_CARRIERS, label: "Bebek Arabası & Oto Koltuğu" },
  { value: ProductCategory.CLOTHING_AND_SHOES, label: "Giyim, Ayakkabı & Tulum" },
  { value: ProductCategory.NURSERY_AND_FURNITURE, label: "Bebek Odası & Beşik" },
  { value: ProductCategory.FEEDING_AND_CARE, label: "Beslenme & Bakım" },
  { value: ProductCategory.TOYS_AND_BOOKS, label: "Oyuncak & Eğitici Setler" },
  { value: ProductCategory.MATERNITY_AND_MOM, label: "Anne & Hamilelik" },
  { value: ProductCategory.OTHER, label: "Diğer" },
];

export const CATEGORY_FILTER_OPTIONS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Tüm Kategoriler" },
  ...PRODUCT_CATEGORY_OPTIONS,
];

export const CONDITION_OPTIONS: { value: ProductCondition; label: string; description: string }[] = [
  { 
    value: ProductCondition.NEW, 
    label: "Sıfır / Etiketli", 
    description: "Hiç kullanılmadı, etiketli veya ambalajında" 
  },
  { 
    value: ProductCondition.LIKE_NEW, 
    label: "Yeni Gibi", 
    description: "Çok az kullanılmış, lekesiz ve kusursuz" 
  },
  { 
    value: ProductCondition.USED, 
    label: "Kullanılmış", 
    description: "Kullanım izleri var ama temiz ve tam işlevsel" 
  },
];

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: AgeGroup.NEWBORN, label: "Yenidoğan (0-3 Ay)" },
  { value: AgeGroup.BABY_3_12M, label: "Bebek (3-12 Ay)" },
  { value: AgeGroup.TODDLER_1_3Y, label: "Oyun Çağı (1-3 Yaş)" },
  { value: AgeGroup.KIDS_3_6Y, label: "Okul Öncesi (3-6 Yaş)" },
  { value: AgeGroup.KIDS_6_12Y, label: "Çocuk (6-12 Yaş)" },
  { value: AgeGroup.MATERNITY, label: "Hamile / Anne" },
];

export const PRODUCT_SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: ProductSort.NAME_ASC, label: "İsim (A–Z)" },
  { value: ProductSort.NAME_DESC, label: "İsim (Z–A)" },
  { value: ProductSort.PRICE_ASC, label: "Fiyat (Önce en ucuz)" },
  { value: ProductSort.PRICE_DESC, label: "Fiyat (Önce en pahalı)" },
];


export function isCategory(value: string): value is ProductCategory {
  return Object.values(ProductCategory).includes(value as ProductCategory);
}

export function isProductCondition(value: string): value is ProductCondition {
  return Object.values(ProductCondition).includes(value as ProductCondition);
}

export function isAgeGroup(value: string): value is AgeGroup {
  return Object.values(AgeGroup).includes(value as AgeGroup);
}

export function isProductSort(value: string): value is ProductSort {
  return Object.values(ProductSort).includes(value as ProductSort);
}

export function formatCategoryLabel(category: ProductCategory): string {
  const option = PRODUCT_CATEGORY_OPTIONS.find((item) => item.value === category);
  return option?.label ?? category;
}

export function formatConditionLabel(condition: ProductCondition): string {
  const option = CONDITION_OPTIONS.find((item) => item.value === condition);
  return option?.label ?? condition;
}

export function formatAgeGroupLabel(ageGroup: AgeGroup): string {
  const option = AGE_GROUP_OPTIONS.find((item) => item.value === ageGroup);
  return option?.label ?? ageGroup;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  priceCents: number;
  currency: Currency;
  stock: number;
  ageGroup?: AgeGroup | null;
  imageUrls: readonly string [];
  isActive: boolean;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};