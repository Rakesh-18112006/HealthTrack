import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiBell,
  FiPlus,
  FiCheck,
  FiClock,
  FiRepeat,
  FiTrash2,
  FiEdit2,
  FiCalendar,
  FiX,
} from "react-icons/fi";

interface Reminder {
  _id: string;
  title: string;
  message?: string;
  remindAt: string;
  repeat: "none" | "daily" | "weekly" | "monthly";
  done: boolean;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    message: "",
    remindAt: "",
    repeat: "none" as const,
  });
  const [activeReminder, setActiveReminder] = useState<string | null>(null);

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/reminders", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(res.data?.reminders ?? []);
    } catch (err) {
      toast.error("Failed to fetch reminders");
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Create reminder
  const createReminder = async () => {
    try {
      if (!newReminder.title || !newReminder.remindAt) {
        toast.error("Title and date are required");
        return;
      }

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/reminders", newReminder, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Reminder created");
      setNewReminder({ title: "", message: "", remindAt: "", repeat: "none" });
      setShowForm(false);
      fetchReminders();
    } catch (err) {
      toast.error("Failed to create reminder");
    }
  };

  // Mark as done
  const markAsDone = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/reminders/${id}/done`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Marked as done");
      fetchReminders();
    } catch (err) {
      toast.error("Failed to mark as done");
    }
  };

  // Delete reminder
  const deleteReminder = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/reminders/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Reminder deleted");
      fetchReminders();
    } catch (err) {
      toast.error("Failed to delete reminder");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Get repeat icon and text
  const getRepeatInfo = (repeat: string) => {
    switch (repeat) {
      case "daily":
        return { icon: <FiRepeat className="text-blue-400" />, text: "Daily" };
      case "weekly":
        return {
          icon: <FiRepeat className="text-purple-400" />,
          text: "Weekly",
        };
      case "monthly":
        return {
          icon: <FiRepeat className="text-pink-400" />,
          text: "Monthly",
        };
      default:
        return { icon: null, text: "No repeat" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-3 rounded-lg mr-3">
              <FiBell className="text-white text-xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Reminders</h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-500 flex items-center px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" />
            New Reminder
          </button>
        </div>

        {/* New Reminder Form */}
        {showForm && (
          <div className="bg-gray-800 p-4 md:p-6 rounded-xl mb-8 shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Reminder</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="What do you want to be reminded about?"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, title: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Add more details..."
                  value={newReminder.message}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, message: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date & Time *
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={newReminder.remindAt}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          remindAt: e.target.value,
                        })
                      }
                      className="w-full pl-10 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Repeat
                  </label>
                  <select
                    value={newReminder.repeat}
                    onChange={(e) =>
                      setNewReminder({
                        ...newReminder,
                        repeat: e.target.value as any,
                      })
                    }
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="none">No Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <button
                onClick={createReminder}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <FiPlus className="mr-2" />
                Create Reminder
              </button>
            </div>
          </div>
        )}

        {/* Reminders List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Reminders</h2>
            <span className="text-gray-400 text-sm">
              {reminders.length}{" "}
              {reminders.length === 1 ? "reminder" : "reminders"}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-700 h-12 w-12 mb-3"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          ) : reminders.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
              <FiBell className="mx-auto text-gray-500 text-4xl mb-3" />
              <p className="text-gray-400">No reminders yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Create your first reminder to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((r) => {
                const repeatInfo = getRepeatInfo(r.repeat);
                return (
                  <div
                    key={r._id}
                    className={`rounded-xl p-4 md:p-5 shadow-lg transition-all border ${
                      r.done
                        ? "bg-gray-800 border-gray-700 opacity-70"
                        : "bg-gray-800 border-gray-700 hover:border-indigo-500"
                    }`}
                    onMouseEnter={() => setActiveReminder(r._id)}
                    onMouseLeave={() => setActiveReminder(null)}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <FiClock className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-400">
                            {formatDate(r.remindAt)}
                          </span>
                          {repeatInfo.icon && (
                            <span className="flex items-center ml-3 text-sm text-gray-400">
                              {repeatInfo.icon}
                              <span className="ml-1">{repeatInfo.text}</span>
                            </span>
                          )}
                        </div>

                        <h3
                          className={`font-semibold text-lg truncate ${
                            r.done ? "line-through text-gray-500" : "text-white"
                          }`}
                        >
                          {r.title}
                        </h3>

                        {r.message && (
                          <p className="text-gray-300 mt-2 whitespace-pre-wrap break-words">
                            {r.message}
                          </p>
                        )}
                      </div>

                      <div className="flex space-x-2 ml-3">
                        {!r.done && (
                          <>
                            <button
                              onClick={() => markAsDone(r._id)}
                              className="bg-green-900 hover:bg-green-800 p-2 rounded-lg transition-colors"
                              title="Mark as done"
                            >
                              <FiCheck className="text-green-400" />
                            </button>
                            <button
                              onClick={() => deleteReminder(r._id)}
                              className="bg-red-900 hover:bg-red-800 p-2 rounded-lg transition-colors"
                              title="Delete reminder"
                            >
                              <FiTrash2 className="text-red-400" />
                            </button>
                          </>
                        )}
                        {r.done && (
                          <button
                            onClick={() => deleteReminder(r._id)}
                            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                            title="Delete reminder"
                          >
                            <FiTrash2 className="text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
