type DashboardFilterProps = {
  months: string[];
  startMonth: string;
  endMonth: string;
  onChangeStartMonth: (value: string) => void;
  onChangeEndMonth: (value: string) => void;
};

export default function DashboardFilter({
  months,
  startMonth,
  endMonth,
  onChangeStartMonth,
  onChangeEndMonth,
}: DashboardFilterProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">表示期間フィルタ</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="startMonth"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            開始年月
          </label>
          <select
            id="startMonth"
            value={startMonth}
            onChange={(e) => onChangeStartMonth(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="endMonth"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            終了年月
          </label>
          <select
            id="endMonth"
            value={endMonth}
            onChange={(e) => onChangeEndMonth(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}