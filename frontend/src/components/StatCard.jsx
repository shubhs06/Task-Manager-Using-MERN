const tones = {
  brand: "from-brand-500 to-brand-600",
  amber: "from-amber-400 to-amber-500",
  green: "from-emerald-400 to-emerald-500",
};

const StatCard = ({ label, value, tone = "brand" }) => (
  <div className="card flex items-center gap-4 p-4">
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${tones[tone]} text-lg font-bold text-white`}
    >
      {value}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">
        {value}
      </p>
    </div>
  </div>
);

export default StatCard;
