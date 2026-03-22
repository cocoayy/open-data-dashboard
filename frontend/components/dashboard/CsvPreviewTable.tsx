import { CsvRawRow } from "@/lib/types";

type CsvPreviewTableProps = {
  headers: string[];
  rows: CsvRawRow[];
  maxRows?: number;
};

export default function CsvPreviewTable({
  headers,
  rows,
  maxRows = 5,
}: CsvPreviewTableProps) {
  const previewRows = rows.slice(0, maxRows);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">CSVプレビュー</h2>
        <p className="mt-1 text-sm text-gray-600">
          先頭 {previewRows.length} 行を表示しています。列名と値を確認してください。
        </p>
      </div>

      {headers.length === 0 ? (
        <p className="text-sm text-gray-500">表示できるデータがありません。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                  {headers.map((header) => (
                    <td
                      key={`${rowIndex}-${header}`}
                      className="border border-gray-200 px-4 py-2 text-gray-700"
                    >
                      {String(row[header] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}