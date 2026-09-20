export type ProductInput = { price: number; quantity: number; usedPercent: number };

export function unitCost({ price, quantity, usedPercent }: ProductInput) {
  if (![price, quantity, usedPercent].every(Number.isFinite) || price < 0 || quantity <= 0 || usedPercent <= 0 || usedPercent > 100) return null;
  const cost = price / (quantity * usedPercent / 100);
  return Number.isFinite(cost) ? cost : null;
}

export function switchingCost(current: number, next: number, extras: number, upfront: number, months: number) {
  if (![current, next, extras, upfront, months].every(Number.isFinite) || [current, next, extras, upfront].some((n) => n < 0) || !Number.isInteger(months) || months < 1 || months > 120) return null;
  const monthly = current - next - extras;
  const total = monthly * months - upfront;
  if (!Number.isFinite(total)) return null;
  return { monthly, total, breakEven: monthly > 0 ? Math.ceil(upfront / monthly) : null };
}
