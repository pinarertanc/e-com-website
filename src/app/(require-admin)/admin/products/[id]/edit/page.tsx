import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { EditProductForm } from "@/components/admin/admin-edit-product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <EditProductForm product = {product}/>
    </div>
  );
}