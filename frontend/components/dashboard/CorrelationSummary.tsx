type Props = {
  correlation: number;
};

export default function CorrelationSummary({ correlation }: Props) {
  let message = "";

  if (correlation > 0.7) {
    message = "強い正の相関があります";
  } else if (correlation > 0.3) {
    message = "弱い正の相関があります";
  } else if (correlation < -0.7) {
    message = "強い負の相関があります";
  } else if (correlation < -0.3) {
    message = "弱い負の相関があります";
  } else {
    message = "相関はほとんど見られません";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        相関分析結果
      </h2>

      <p className="text-xl font-bold text-blue-600">
        相関係数: {correlation.toFixed(2)}
      </p>

      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
}