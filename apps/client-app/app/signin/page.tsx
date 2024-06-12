import { Logo } from "@repo/ui/Logo";
export default function () {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-2xl p-20 flex flex-col justify-center items-center ">
        <div className="flex flex-col gap-4">
          <Logo />
          <div className="w-full">
            <input
              className="border border-slate-500 p-2 rounded-xl focus:outline-none"
              type="text"
              placeholder="Phone/Email"
            />
          </div>
          <div className="w-full">
            <input
              className="border border-slate-500 p-2 rounded-xl focus:outline-none"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
