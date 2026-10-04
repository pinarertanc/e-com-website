
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`text-3xl font-bold tracking-tight text-foreground ${className}`}>
      {children}
    </h1>
  );
}


export function MutedText({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-base text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

export function BodyText({ children, className = "" }: TypographyProps) {
  return (
    <p className={`font-medium text-sm text-foreground ${className}`}>
      {children}
    </p>
  );
}