import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import  { Toaster } from "react-hot-toast";
import Reminders from "../../components/Reminders";

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const quickItems = [
    { icon: "favorite", label: "Vitals", link: "/records/vitals" },
    { icon: "syringe", label: "Vaccinations", link: "/records/vaccinations" },
    { icon: "pill", label: "Medications", link: "/records/medications" },
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111714] overflow-x-hidden"
      style={{ fontFamily: "'Spline Sans', 'Noto Sans', sans-serif" }}
    >
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

      {/* Header */}
      <header className="flex items-center justify-between border-b border-b-[#29382f] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-emerald-400">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  clipRule="evenodd"
                  d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect fill="white" width="48" height="48" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            HealthTrack
          </h2>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <nav className="flex items-center gap-2">
            <Link
              to="/user-dashboard"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/records"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Records
            </Link>
            <Link
              to="/reminders"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Reminders
            </Link>
            <Link
              to="/settings"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4 pl-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29382f] text-white/70 hover:bg-white/10 hover:text-white"></button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
              style={{
                backgroundImage: `url("https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff")`,
              }}
            ></div>
            <button
              onClick={logout}
              className="ml-2 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-1 px-10 py-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            Dashboard
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* User Info */}
              <div className="rounded-2xl bg-[#1c2620] p-6 shadow-lg flex items-center gap-6">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-24 h-24 shrink-0"
                  style={{
                    backgroundImage: `url("https://ui-avatars.com/api/?name=${user?.name}&background=random")`,
                  }}
                ></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user?.name}
                  </h2>
                  <p className="mt-1 text-base text-[#9eb7a8]">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-900/50 px-3 py-1 text-sm font-medium text-emerald-400">
                    <span className="material-symbols-outlined text-base">
                      verified_user
                    </span>
                    <span>Privacy: Protected</span>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Quick Access
                </h2>
                <div className="mt-4 flex gap-4">
                  <Link
                    to="/records"
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-emerald-500 px-6 text-base font-bold text-[#111714] hover:bg-emerald-400"
                  >
                    View Records
                  </Link>
                  <Link
                    to="/create-record"
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#29382f] px-6 text-base font-bold text-white hover:bg-[#3d5245]"
                  >
                    Add New Record
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {quickItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.link}
                      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#3d5245] bg-[#1c2620] p-4 hover:border-emerald-500 hover:bg-[#29382f]"
                    >
                      <span className="material-symbols-outlined text-4xl text-white">
                        {item.icon}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {item.label}
                      </h3>
                    </Link>
                  ))}
                  {/* <Reminders /> */}
                </div>
              </div>
            </div>            
            </div>
          </div>
      </main>
    </div>
  );
};

export default UserDashboard;
