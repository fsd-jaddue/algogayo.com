import assert from "node:assert/strict";
import { annualPlanCost, unitCost, switchingCost } from "../src/lib/calculations.ts";

assert.equal(unitCost({ price: 10900, quantity: 1000, usedPercent: 80 }), 13.625);
assert.equal(unitCost({ price: 0, quantity: 100, usedPercent: 100 }), 0);
for (const input of [
  { price: -1, quantity: 100, usedPercent: 100 },
  { price: 100, quantity: 0, usedPercent: 100 },
  { price: 100, quantity: 100, usedPercent: 0 },
  { price: 100, quantity: 100, usedPercent: 101 },
  { price: Infinity, quantity: 100, usedPercent: 100 },
]) assert.equal(unitCost(input), null);
assert.deepEqual(switchingCost(45000, 30000, 8000, 80000, 12), { monthly: 7000, total: 4000, breakEven: 12 });
assert.equal(switchingCost(45000, 30000, 8000, 80000, 6).total, -38000);
assert.equal(switchingCost(100, 100, 0, 100, 12).breakEven, null);
assert.equal(switchingCost(100, 110, 0, 0, 12).total, -120);
assert.equal(switchingCost(100, 90, 0, 0, 12).breakEven, 0);
assert.equal(switchingCost(100, 90, 0, 0, 0), null);
assert.equal(switchingCost(100, 90, 0, 0, 1.5), null);
assert.equal(switchingCost(100, NaN, 0, 0, 12), null);
assert.deepEqual(annualPlanCost(10900, 109000, 12), { monthlyTotal: 130800, annualTotal: 109000, difference: 21800, breakEvenMonths: 10, discountPercent: 1 / 6 * 100 });
assert.equal(annualPlanCost(10900, 109000, 10).difference, 0);
assert.equal(annualPlanCost(10900, 109000, 6).difference, -43600);
assert.equal(annualPlanCost(10000, 96000, 12).breakEvenMonths, 9.6);
assert.ok(Math.abs(annualPlanCost(10000, 96000, 12).discountPercent - 20) < 1e-9);
assert.equal(annualPlanCost(10000, 130000, 12).difference, -10000);
assert.equal(annualPlanCost(10000, 0, 1).difference, 10000);
for (const args of [[0, 100, 12], [-1, 100, 12], [100, -1, 12], [100, 100, 0], [100, 100, 13], [100, 100, 2.5], [NaN, 100, 12]]) assert.equal(annualPlanCost(...args), null);
console.log("Calculation checks passed: waste, zero/invalid input, switching costs, recovery periods and annual plans.");
