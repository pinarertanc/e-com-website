"use client";

import { useActionState, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { FormField } from "../formField";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ACCEPTED_IMAGE_ACCEPT_ATTR } from "@/lib/product-images";
import { Currency, EU_CURRENCY_OPTIONS } from "@/types/currency";
import { PRODUCT_CATEGORY_OPTIONS, CONDITION_OPTIONS, Product, AGE_GROUP_OPTIONS } from "@/types/product";
import { updateProductAction} from "@/app/(require-admin)/admin/products/[id]/edit/action";
import { ProductActionState } from '@/types/product';
type EditProductFormProps = {
  product: Product;
};

const initialState: ProductActionState = {
  error: null,
};

export function EditProductForm({ product }: EditProductFormProps) {
  const [state, formAction, isPending] = useActionState(updateProductAction, initialState);

  const [existingImages, setExistingImages] = useState<string[]>(
  product.imageUrls ? [...product.imageUrls] : []
);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const handleRemoveExistingImage = (imageUrls: string) => {
    setExistingImages((prev) => prev.filter((url) => url !== imageUrls));
    setImagesToDelete((prev) => [...prev, imageUrls]);
  };

  return (
    <form action={formAction} className="space-y-8">
  
      <input type="hidden" name="sellerId" value={product.sellerId} />
      <input type="hidden" name="productId" value={product.id} />
      <input type="hidden" name="imageUrls" value={JSON.stringify(existingImages)} />
      <input type="hidden" name="imagesToDelete" value={JSON.stringify(imagesToDelete)} />

      {state?.error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Basic details</h2>
          <p className="text-sm text-muted-foreground">
            Core product information stored in the <code>products</code> collection.
          </p>
        </div>

        <div className="grid gap-4">
          <FormField id="productIdDisplay" label="Product ID (Read-only)">
            <Input
              id="productIdDisplay"
              value={product.id}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed font-mono text-xs"
            />
          </FormField>

          <FormField id="name" label="Name">
            <Input
              id="name"
              name="name"
              defaultValue={product.name}
              placeholder="Ürün adı"
              required
            />
          </FormField>

          <FormField id="description" label="Description">
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description}
              placeholder="Ürün açıklaması"
              required
            />
          </FormField>

          <FormField id="category" label="Category">
            <select
              id="category"
              name="category"
              defaultValue={product.category}
              className="h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {PRODUCT_CATEGORY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="ageGroup" label="Age Group">
            <select
              id="ageGroup"
              name="ageGroup"
              defaultValue={product.ageGroup}
              className="h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {AGE_GROUP_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="condition" label="Condition">
            <div className="flex flex-wrap gap-4 pt-2">
              {CONDITION_OPTIONS.map((option) => (
                <Label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                >
                  <Input
                    type="radio"
                    name="condition"
                    value={option.value}
                    defaultChecked={product.condition === option.value}
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-primary accent-primary"
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </FormField>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Pricing & inventory</h2>
          <p className="text-sm text-muted-foreground">
            Price is entered in major units and stored as <code>priceCents</code> in the database.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField id="price" label="Price" className="sm:col-span-1">
            <Input
              id="price"
              name="price"
              type="text"
              inputMode="decimal"
              defaultValue={(product.priceCents / 100).toFixed(2)}
              placeholder="19.99"
              required
            />
          </FormField>

          <FormField id="currency" label="Currency" className="sm:col-span-1">
            <select
              id="currency"
              name="currency"
              defaultValue={product.currency}
              className="h-9 w-full rounded-lg border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
            >
              {EU_CURRENCY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="stock" label="Stock" className="sm:col-span-1">
            <Input
              id="stock"
              name="stock"
              type="number"
              min={0}
              step={1}
              defaultValue={product.stock}
              required
            />
          </FormField>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Images</h2>
          <p className="text-sm text-muted-foreground">
            Manage existing images or upload new ones to Vercel Blob.
          </p>
        </div>

        {existingImages.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Current Images</Label>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative group size-20 rounded-md border overflow-hidden">
                  <Image
                    src={url}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(url)}
                    className="absolute top-1 right-1 bg-destructive text-white rounded-full size-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition-opacity"
                    title="Görseli Sil"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <FormField id="newImages" label="Add new images">
          <Input
            id="newImages"
            name="newImages"
            type="file"
            accept={ACCEPTED_IMAGE_ACCEPT_ATTR}
            multiple
          />
        </FormField>
      </section>

      <section className="space-y-4">
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={product.isActive}
            className="size-4 rounded border border-input accent-primary"
          />
          <span>Product is active and visible in the store</span>
        </label>
      </section>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating product..." : "Update product"}
        </Button>
        <Button asChild variant="outline" disabled={isPending}>
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
