"use client";

import { CsvColumnMapping } from "@/lib/types";

type Props = {
  headers: string[];
  mapping: CsvColumnMapping;
  onChange: (mapping: CsvColumnMapping) => void;
  onApply: () => void;
  disabled?: boolean;
};

type MappingField = keyof CsvColumnMapping;

const fieldLabels: Record<MappingField, string> = {
  yearMonthColumn: "年月列",
  gasSalesColumn: "販売量列",
  avgTemperatureColumn: "平均気温列",
};

export default function ColumnMappingForm({
  headers,
  mapping,
  onChange,
  onApply,
  disabled = false,
}: Props) {
  const handleChange = (field: MappingField, value: string) => {
    onChange({
      ...mapping,
      [field]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        列マッピング設定
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        CSVのどの列を「年月」「販売量」「平均気温」として使うか選択してください。
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(fieldLabels) as MappingField[]).map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {fieldLabels[field]}
            </label>
            <select
              id={field}
              value={mapping[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="">選択してください</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onApply}
        disabled={disabled}
        className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        この設定でダッシュボードを作成
      </button>
    </div>
  );
}