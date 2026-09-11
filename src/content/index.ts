import type { PostEntry } from "@/lib/content-types";
import { post as weeklyMealPlanWithoutWaste } from "./posts/weekly-meal-plan-without-waste";
import { post as smartphoneNotificationReset } from "./posts/smartphone-notification-reset";
import { post as weekendTripLightPacking } from "./posts/weekend-trip-light-packing";
import { post as fixedExpenseReview } from "./posts/fixed-expense-review";
import { post as photoBackupThreeStep } from "./posts/photo-backup-three-step";
import { post as rainyDayTravelPlan } from "./posts/rainy-day-travel-plan";
import { post as groceryUnitPrice } from "./posts/grocery-unit-price";
import { post as passwordManagerStart } from "./posts/password-manager-start";
import { post as utilityBillMonthlyCheck } from "./posts/utility-bill-monthly-check";
import { post as phishingSmsCheck } from "./posts/phishing-sms-check";
import { post as domesticTrainBookingTips } from "./posts/domestic-train-booking-tips";
import { post as accommodationCancellationCheck } from "./posts/accommodation-cancellation-check";

/** 발행된 글 목록. 순서는 중요하지 않다(발행일로 정렬됨). */
export const entries: PostEntry[] = [
  weeklyMealPlanWithoutWaste,
  smartphoneNotificationReset,
  weekendTripLightPacking,
  fixedExpenseReview,
  photoBackupThreeStep,
  rainyDayTravelPlan,
  groceryUnitPrice,
  passwordManagerStart,
  utilityBillMonthlyCheck,
  phishingSmsCheck,
  domesticTrainBookingTips,
  accommodationCancellationCheck,
];
