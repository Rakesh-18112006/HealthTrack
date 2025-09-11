import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
  Calendar,
  Stethoscope,
  Building,
  Download,
  FileDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Record {
  id: string;
  type: string;
  title: string;
  notes: { description?: string };
  meta?: { doctor?: string; hospital?: string };
  createdAt: string;
}

const ViewRecords: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<{
    title: string;
    type: string;
    notes: string;
    doctor: string;
    hospital: string;
  }>({
    title: "",
    type: "",
    notes: "",
    doctor: "",
    hospital: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch records
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/health", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data.records);
    } catch (err) {
      toast.error("Error fetching records");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // 🔹 Delete a record
  const deleteRecord = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/health/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(records.filter((rec) => rec.id !== id));
      toast.success("Record deleted successfully");
    } catch (err) {
      toast.error("Error deleting record");
      console.error(err);
    }
  };

  // 🔹 Start editing
  const startEdit = (rec: Record) => {
    setEditingId(rec.id);
    setFormData({
      title: rec.title,
      type: rec.type,
      notes: rec.notes?.description || "",
      doctor: rec.meta?.doctor || "",
      hospital: rec.meta?.hospital || "",
    });
  };

  // 🔹 Update record
  const updateRecord = async (id: string) => {
    try {
      const notes = { description: formData.notes };
      //@ts-ignore
      const meta: Record<string, string> = {};
      if (formData.doctor) meta.doctor = formData.doctor;
      if (formData.hospital) meta.hospital = formData.hospital;

      const res = await axios.put(
        `http://localhost:5000/api/health/${id}`,
        { title: formData.title, type: formData.type, notes, meta },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRecords(
        records.map((rec) =>
          rec.id === id ? { ...rec, ...res.data.record } : rec
        )
      );
      setEditingId(null);
      toast.success("Record updated successfully");
    } catch (err) {
      toast.error("Error updating record");
      console.error(err);
    }
  };

  // 🔹 Download PDF
  const downloadPDF = async () => {
    try {
      setExportLoading(true);
      const response = await axios.get("http://localhost:5000/api/export/pdf", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "health_records.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PDF downloaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to download PDF");
    } finally {
      setExportLoading(false);
    }
  };

  // 🔹 Download JSON
  const downloadJSON = async () => {
    try {
      setExportLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/export/json",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "health_records.json");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("JSON downloaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to download JSON");
    } finally {
      setExportLoading(false);
    }
  };

  // 🔹 Filter records by title/type
  const filteredRecords = records.filter(
    (rec) =>
      rec.title.toLowerCase().includes(search.toLowerCase()) ||
      rec.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Health Records
            </h2>
            <p className="text-gray-400">
              Manage your medical history and health information
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={downloadPDF}
              disabled={exportLoading || records.length === 0}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              <FileDown size={18} />
              {exportLoading ? "Exporting..." : "PDF"}
            </button>
            <button
              onClick={downloadJSON}
              disabled={exportLoading || records.length === 0}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              <Download size={18} />
              {exportLoading ? "Exporting..." : "JSON"}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by title or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <FileText className="h-16 w-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {records.length === 0
                ? "No records found"
                : "No matching records"}
            </h3>
            <p className="text-gray-500 max-w-md">
              {search
                ? "Try adjusting your search terms"
                : "Get started by adding your first health record"}
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-5 transition-all hover:shadow-lg hover:border-gray-600/50"
              >
                {editingId === rec.id ? (
                  <div className="space-y-4">
                    {/* Edit form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-gray-700/60 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Type
                        </label>
                        <input
                          type="text"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-gray-700/60 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-700/60 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        placeholder="Add notes about this record"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Doctor
                        </label>
                        <input
                          type="text"
                          value={formData.doctor}
                          onChange={(e) =>
                            setFormData({ ...formData, doctor: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-gray-700/60 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                          placeholder="Doctor's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                          Hospital
                        </label>
                        <input
                          type="text"
                          value={formData.hospital}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hospital: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-gray-700/60 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                          placeholder="Hospital name"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => updateRecord(rec.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-500/20"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-xl transition-all duration-200"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Normal view */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {rec.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/40 text-indigo-300">
                        {rec.type}
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-300">
                      {rec.notes?.description && (
                        <p className="text-sm">{rec.notes.description}</p>
                      )}

                      <div className="flex flex-wrap gap-4 pt-2">
                        {rec.meta?.doctor && (
                          <div className="flex items-center gap-2 text-sm">
                            <Stethoscope
                              size={16}
                              className="text-emerald-400"
                            />
                            <span className="text-gray-400">Doctor:</span>
                            <span>{rec.meta.doctor}</span>
                          </div>
                        )}

                        {rec.meta?.hospital && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building size={16} className="text-blue-400" />
                            <span className="text-gray-400">Hospital:</span>
                            <span>{rec.meta.hospital}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-purple-400" />
                          <span className="text-gray-400">Created:</span>
                          <span>
                            {new Date(rec.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700/50">
                      <button
                        onClick={() => startEdit(rec)}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-all duration-200"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(rec.id)}
                        className="flex items-center gap-2 bg-red-900/40 hover:bg-red-800/40 text-red-300 px-3 py-2 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRecords;
