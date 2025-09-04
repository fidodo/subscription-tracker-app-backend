import { createRequire } from "module";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1]; // days before renewal

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  // Logic to send reminders based on the subscriptionId
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  // Simulate sending a reminder (e.g., via email)
  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has already passed for ${subscriptionId}. No reminder needed.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `${daysBefore} day${daysBefore === 1 ? "" : "s"} before reminder`,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} day${daysBefore === 1 ? "" : "s"} before reminder`,
        subscription
      );
    }
    //   if (dayjs().isAfter(dayjs(subscription.renewalDate).subtract(3, "day"))) {
    //     console.log(
    //       `Reminder: Subscription for ${subscription.user.email} is renewing on ${renewalDate}`
    //     );
    //   } else {
    //     console.log(
    //       `No reminder needed for ${subscription.user.email}. Renewal date is ${renewalDate}`
    //     );
    //   }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("fetchSubscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  // console.log(`Waiting for ${label}... reminder at${date}`);
  await context.sleepUntil(label, date.toDate());
  const now = dayjs();
  const delay = date.diff(now, "millisecond");
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`triggering ${label} for ${subscription.user.email}`);
    // send email logic here

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
