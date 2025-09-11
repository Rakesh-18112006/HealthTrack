import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface RecordForm {
  type: string;
  title: string;
  notes: string;
  doctor?: string;
  hospital?: string;
}

const CreateNewRecord: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RecordForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RecordForm) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const notes = { description: data.notes };
      const meta: Record<string, string> = {};
      if (data.doctor) meta.doctor = data.doctor;
      if (data.hospital) meta.hospital = data.hospital;

      await axios.post(
        "http://localhost:5000/api/health",
        {
          type: data.type,
          title: data.title,
          notes,
          meta,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Record created successfully");
      reset();
      navigate("/records"); // Redirect after success
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111714] p-6">
      <div className="w-full max-w-lg bg-[#1c2620] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Health Record
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-white">Type</label>
            <select
              {...register("type", { required: true })}
              className="w-full border border-[#3d5245] bg-[#111714] text-white rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="allergy">Allergy</option>
              <option value="vital">Vital</option>
              <option value="prescription">Prescription</option>
              <option value="visit">Visit</option>
              <option value="vaccination">Vaccination</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter record title"
              className="w-full border border-[#3d5245] bg-[#111714] text-white rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white">
              Notes
            </label>
            <textarea
              {...register("notes")}
              placeholder="Enter health notes"
              className="w-full border border-[#3d5245] bg-[#111714] text-white rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium text-white">
              Doctor
            </label>
            <input
              type="text"
              {...register("doctor")}
              placeholder="Doctor's name"
              className="w-full border border-[#3d5245] bg-[#111714] text-white rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium text-white">
              Hospital
            </label>
            <input
              type="text"
              {...register("hospital")}
              placeholder="Hospital/Clinic"
              className="w-full border border-[#3d5245] bg-[#111714] text-white rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-emerald-500 text-[#111714] py-2 rounded-full font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading && (
              <span className="loader mr-2 border-t-2 border-white rounded-full w-4 h-4 animate-spin"></span>
            )}
            {isSubmitting || loading ? "Saving..." : "Create Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewRecord;
