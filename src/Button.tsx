import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariante = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: ButtonVariante;
}

/** Grund-Button in 3 Varianten (rhapp-frontend#41). `type="button"` per
 * Default, damit ein Button innerhalb eines <form> nicht versehentlich
 * submitted - explizit `type="submit"` uebergeben, wenn das gewollt ist. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variante = "primary", className, type, ...rest }, ref) {
    const klassen = ["ids-button", `ids-button--${variante}`, className]
      .filter(Boolean)
      .join(" ");
    return (
      <button ref={ref} type={type ?? "button"} className={klassen} {...rest} />
    );
  }
);
