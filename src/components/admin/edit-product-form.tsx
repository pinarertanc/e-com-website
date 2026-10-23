import { updateProductAction } from "@/app/(require-admin)/admin/products/[id]/edit/action";
import { Product } from "@/types/product";
import { useActionState } from "react";
import { actionResponse } from "@/types/form";
import { Label } from "../ui/label";
import { Input } from "@base-ui/react";
import { Textarea } from "../ui/textarea";


const initialState: actionResponse = {
  success: false,
  message: null,
  error: null,
  errors: undefined,
};

export function EditProductForm({product}: {product:Product}){
  const [state, formAction, isPending] = useActionState(updateProductAction, initialState);

return(

  <form action={formAction} className="space-y-6">
   <Label>Product ID:
    <Input 
      type="hidden"
      name="productId"
      value={product.id}
      disabled
      className="bg-muted cursor-not-allowed"
      />
      </Label>
      {state.message &&(
        <div className={`p-3 rounded-md text-sm ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </div>
      )}

      <div>
        <Label>Product Name:
        <Input
         id="name"
         name="name"
         defaultValue={product.name}
         required
        />
        </Label>
        {state.errors?.name && 
        <p className="text-xs text-red-500">
          {state.errors.name[0]}
        </p>}
      </div>

      <div>
        <Label>Product Description
          <Textarea
          id="description"
          name="description"
          defaultValue={product.description}
          rows={5}
          required
          />
          </Label>
          {state.errors?.description &&
          <p className="text-xs text-red-500">
            {state.errors.description[0]}
          </p>
          }
      </div>

      <div>
        <Label>Price:
          <Input
           id="price"
           name="price"
           defaultValue={product.priceCents}
           required
          />
        </Label>
        {state.errors?.priceCents &&
        <p className="text-xs text-red-500">
      {state.errors.priceCents[0]}
          </p>}
      </div>

      <div>
        <Label>Stock:
          <Input
           id="stock"
           name="stock"
           defaultValue={product.stock}
           required
          />
        </Label>
        {state.errors?.stock &&
        <p className="text-xs text-red-500">
          {state.errors.stock[0]}
          </p>}
      </div>

      <div>
        <Label>Condition:

        </Label>
      </div>



  </form>

)
  
}