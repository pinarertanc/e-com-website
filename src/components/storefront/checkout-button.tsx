import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface CheckOutButtonProps{
  stripePriceId:string,
  quantity: string,
}

export function CheckoutButton ({stripePriceId ,quantity}:CheckOutButtonProps ){
 
  return (
    <form action="/api/checkout" method="POST">
      <Input type="hidden" name={'stripePriceId'} value={stripePriceId}/>
       <Input type="hidden" name={'quantity'} value={quantity}/>
      <section>
        <Button type="submit" role="link">
          Checkout
        </Button>
      </section>
    </form>
  )
}
