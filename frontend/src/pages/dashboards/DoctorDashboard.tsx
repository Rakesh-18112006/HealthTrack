import React from "react";

const Dashboard: React.FC = () => {
  const patients = [
    {
      name: "Olivia Bennett",
      age: 31,
      gender: "F",
      lastVisit: "2023-12-05",
      diagnosis: "Hypertension",
      status: "Stable",
      statusColor: "green",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJfZ45zdmir09L4TcmOXRC2CixaCDs9Bbh3KehkcRvl3sRuRhYDi4akifWC7p_miu5aAvmJD6Drwhobkj7lQtlkggeZNYHhB8C7YDhKvvixaib_r7YIVEvBaPcBMNIUXd_QdyzZZwkoAquHZwE7N5aO9kiJ7FFYHmtMQcCevfZGYEJ_-L29P1bWvc3sItkJRhA01luBsTHzY5lnH0WkVvJCXorGGDInXXFt7LjxYwlRS-5FbdsIIMpozWYrLXbjDQUNarKgaUOjNs",
    },
    {
      name: "Liam Harper",
      age: 38,
      gender: "M",
      lastVisit: "2023-11-20",
      diagnosis: "Type 2 Diabetes",
      status: "Needs Follow-up",
      statusColor: "yellow",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbfHRdNR7GKLTj8gSL6k-tOtMmny5Oq4Uvn9L1JtfnS9Wv8yjD21uHRuAWEoBlp_b420fMiiFuu-nS080pytIy67J4QwsMXeoyaT-SkNmpkgw-FZZUAE77pTkIWNyX8s_mPYXS038gKp6_laZrdwLbShYqlaBYkl0NIdzFZ8TZ5baDm_rM57V8H-Y549cYzSBMbCcCurtAX3bvqV6Ptfoqseq4UZd2zzlj6Fk-lPCiQlkQ2RvC75Dd-V5sHC_DdMA-aYz2o3B--uA",
    },
    {
      name: "Noah Foster",
      age: 45,
      gender: "M",
      lastVisit: "2023-10-15",
      diagnosis: "Asthma",
      status: "Stable",
      statusColor: "green",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLtIxOvOsLlbk2ONayc6CILFaFKf_gUq2Le47llNPz0DkqTy_bYe9DeVaVSnq_ZRuZCp6K2sv7l-7scQgSHS8VMjJnlW3nA_8bydvgDnIyD0yRzTchbn2XGyRaLVBdyzzLzzGH8w4Mrp_b6aNWVpz0P5CarNygaPDb3L6ZGQlG0nFPQ1YcejzfS8shFARMzF4Jcwm2NDz04BEauR_BUst3KFs2lkjWPWlNacrb13xx93Nj06kxsR4I8Qs1RpV0MxUXrIxKeaPNZn4",
    },
    {
      name: "Ava Coleman",
      age: 34,
      gender: "F",
      lastVisit: "2024-01-10",
      diagnosis: "Arrhythmia",
      status: "High Risk",
      statusColor: "red",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBM7Ue-cJZ8QoiVCGhLKM8kUuTrKib7DWMs4rX1qRZ6SR4wcPc5LQ1tDx5uXK9Iy27uAY5d6m23-Gipvvzgfku33CpM8TQp5YasUL3aqNKJWzFajFH7_kF_Cn_D2YykkSOT5_OfgMVTkS47-fWC1Xoz19KI8vZDwc61VaCNZUdka9-2YN6Zkw9rzwBrnr5nCKn8xTNaCBPi8bKNcuBpmvbDmNcwcMl2QLp7v_QDkDg2kJTMVwS_exFcWaHanL2QQihnSuNE-1-JCkc",
    },
  ];

  const statusColors: { [key: string]: string } = {
    green: "bg-green-900/50 text-green-400",
    yellow: "bg-yellow-900/50 text-yellow-400",
    red: "bg-red-900/50 text-red-400",
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-300 font-sans">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-black border-r border-gray-800 p-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="material-symbols-outlined text-primary-400 text-3xl">
            health_and_safety
          </span>
          <h1 className="text-white text-xl font-bold">HealthTracker</h1>
        </div>
        <div className="flex flex-col gap-2">
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 text-white"
            href="#"
          >
            <span className="material-symbols-outlined"> dashboard </span>
            <p className="text-sm font-medium">Dashboard</p>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-900 text-gray-400"
            href="#"
          >
            <span className="material-symbols-outlined"> group </span>
            <p className="text-sm font-medium">Patients</p>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-900 text-gray-400"
            href="#"
          >
            <span className="material-symbols-outlined"> calendar_month </span>
            <p className="text-sm font-medium">Appointments</p>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-900 text-gray-400"
            href="#"
          >
            <span className="material-symbols-outlined"> chat </span>
            <p className="text-sm font-medium">Messages</p>
          </a>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-900 text-gray-400"
            href="#"
          >
            <span className="material-symbols-outlined"> settings </span>
            <p className="text-sm font-medium">Settings</p>
          </a>
          <div className="border-t border-gray-800 my-2"></div>
          <div className="flex items-center gap-3 px-3 py-2">
            <img
              alt="Dr. Emily Carter"
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjYdtemMsqegMa0UMermant-H6Cl38VALxXMlwHqD6R40Q_oR0P6EN38r8Js6Vlq2KEd73e8KIaHui8TdXpsUABGXq7YWgNqiB-k4w4Z4CkKTFzM_-_qiM0Pdk0cppJRo4IPZfIQESWcj3EUYdLaxbhvm7wRTX5mI9TzC2UEZwKsUKAxomcVjOG5RLV5fYTuo9xCAkrBQYBjYtHu8k9SJLJJZujR7Yvh-5USfBiCp5wrUiXSmZmEjMRSBqJG3iDolcPFwDhj8X_Ug"
            />
            <div>
              <p className="text-white text-sm font-medium">Dr. Emily Carter</p>
              <p className="text-primary-400 text-xs">Cardiologist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-black">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, Dr. Carter. Here's a summary of your patients'
              health.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold">
              <span className="material-symbols-outlined"> person_add </span>
              <span>Add Patient</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold">
              <span className="material-symbols-outlined"> event </span>
              <span>Schedule</span>
            </button>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-800">
              <span className="material-symbols-outlined text-primary-400 text-3xl">
                group
              </span>
            </div>
            <div>
              <p className="text-gray-400">Total Patients</p>
              <p className="text-2xl font-bold text-white">245</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-800">
              <span className="material-symbols-outlined text-primary-400 text-3xl">
                calendar_today
              </span>
            </div>
            <div>
              <p className="text-gray-400">Appointments Today</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-900/50">
              <span className="material-symbols-outlined text-orange-400 text-3xl">
                pending
              </span>
            </div>
            <div>
              <p className="text-gray-400">Pending Lab Results</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-900/50">
              <span className="material-symbols-outlined text-red-400 text-3xl">
                warning
              </span>
            </div>
            <div>
              <p className="text-gray-400">High-Risk Patients</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Patients
            </h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-white"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {patients.map((patient, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        alt={patient.name}
                        className="w-10 h-10 rounded-full"
                        src={patient.avatar}
                      />
                      <div>
                        <p className="font-medium text-white">{patient.name}</p>
                        <p className="text-sm text-gray-400">
                          {patient.gender}, {patient.age}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {patient.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        statusColors[patient.statusColor]
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary-400 hover:text-primary-300">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
