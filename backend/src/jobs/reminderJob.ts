import cron from "cron";
import Reminder from "../models/Reminder";
import User from "../models/User";
import { sendMail } from "../services/mailService";
import AuditLog from "../models/AuditLog";

// Runs every minute to keep simple — production: use queue / worker
const job = new cron.CronJob("* * * * *", async () => {
  try {
    const now = new Date();
    console.log(`[ReminderJob] Running at: ${now.toISOString()}`);

    const due = await Reminder.find({ remindAt: { $lte: now }, done: false });
    console.log(`[ReminderJob] Found ${due.length} due reminders`);

    for (const r of due) {
      console.log(`[ReminderJob] Processing reminder: ${r._id} - ${r.title}`);

      const user = await User.findById(r.owner);
      if (!user) {
        console.log(`[ReminderJob] User not found for reminder: ${r._id}`);
        continue;
      }

      // simple email
      try {
        const info = await sendMail(
          user.email,
          `Reminder: ${r.title}`,
          r.message || "You have a reminder"
        );
        console.log(
          `[ReminderJob] Email sent to ${user.email}, messageId: ${info?.messageId}`
        );

        await AuditLog.create({
          user: user._id,
          action: "sent_reminder_email",
          meta: { reminder: r._id },
        });
        console.log(`[ReminderJob] Audit log created for reminder: ${r._id}`);
      } catch (e) {
        console.error(
          `[ReminderJob] Failed to send mail for reminder: ${r._id}`,
          e
        );
      }

      // repeat handling
      if (r.repeat === "none") {
        r.done = true;
        console.log(`[ReminderJob] Marked reminder as done: ${r._id}`);
      } else {
        const next = new Date(r.remindAt);
        if (r.repeat === "daily") next.setDate(next.getDate() + 1);
        if (r.repeat === "weekly") next.setDate(next.getDate() + 7);
        if (r.repeat === "monthly") next.setMonth(next.getMonth() + 1);
        r.remindAt = next;
        console.log(
          `[ReminderJob] Scheduled next reminder for: ${
            r._id
          } at ${next.toISOString()}`
        );
      }

      await r.save();
    }
  } catch (err) {
    console.error("[ReminderJob] Error in reminder job", err);
  }
});

export default job;
