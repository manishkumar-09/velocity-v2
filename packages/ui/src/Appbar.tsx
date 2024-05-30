export const Appbar = () => {
  return (
    <div className="flex justify-between bg-slate-100 border shadow-2xl px-10 py-4">
      <div className="font-xl font-bold px-4 py-1.5 rounded-sm">Velocity</div>
      <div>
        <button className="bg-gray-700 text-white font-xl font-bold px-4 py-1.5 rounded-sm">
          Login
        </button>
      </div>
    </div>
  );
};
