import assert from "node:assert/strict";
import { unitCost, switchingCost } from "../src/lib/calculations.ts";

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
console.log("Calculation checks passed: waste, zero/invalid input, switching costs and recovery periods.");
