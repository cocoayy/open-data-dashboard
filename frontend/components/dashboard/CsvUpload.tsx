"use client";

type CsvUploadProps = {
  onFileSelect: (file: File) => void;
  errorMessage?: string;
};

export default function CsvUpload({
  onFileSelect,
  errorMessage,
}: CsvUploadProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        CSVアップロード
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        CSVを読み込み、列の対応関係を指定してダッシュボードを生成します。
      </p>

      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
      />

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}