
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CheckOutButtonProps {
  stripePriceId?: string;
  quantity?: string;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  children?: ReactNode;
}

export function CheckoutButton({
  stripePriceId,
  quantity,
  disabled,
  onClick,
  className,
  children = "Checkout",
}: CheckOutButtonProps) {
 
  if (onClick) {
    return (
      <Button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    );
  }

 
  return (
    <form action="/api/checkout" method="POST">
      {stripePriceId && (
        <Input type="hidden" name="stripePriceId" value={stripePriceId} />
      )}
      {quantity && <Input type="hidden" name="quantity" value={quantity} />}
      <section>
        <Button
          type="submit"
          role="link"
          disabled={disabled}
          className={className}
        >
          {children}
        </Button>
      </section>
    </form>
  );
}