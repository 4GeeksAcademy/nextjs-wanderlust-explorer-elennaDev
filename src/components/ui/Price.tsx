import { formatPrice } from "@/lib/format";

type PriceProps = {
  amount: number;
  className?: string;
};

export default function Price({ amount, className = "" }: PriceProps) {
  return <span className={`font-medium ${className}`}>{formatPrice(amount)}</span>;
}
