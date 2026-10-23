import { updateProductAction } from "@/app/(require-admin)/admin/products/[id]/edit/action";
import { Product } from "@/types/product";
import { useActionState } from "react";
import { actionResponse } from "@/types/form";


const initialState: actionResponse = {
  success: false,
  message: null,
  error: null,
  errors: undefined,
};

export function EditProductForm({product}: Product){
  const [state, formAction, isPending] = useActionState(updateProductAction, initialState);

return(

  <form action={formAction} className="space-y-6">

    <input 
      type="hidden"
      name="productId"
      value={product.id}
      />
      {state.message &&(
        <div className={`p-3 rounded-md text-sm ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {state.message}
        </div>
      )}

      <div>
        <input
         id="name"
         name="name"
         value={product.name}
        />
      </div>



  </form>

)
  
}