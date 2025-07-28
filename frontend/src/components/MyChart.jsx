import ReactECharts from "echarts-for-react";

const salesData = [
  { month: "Jan", sales: 5000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

function MyChart({ type }) {
  const option =
    type === "bar"
      ? {
          title: { text: "Doanh thu theo tháng" },
          tooltip: {},
          xAxis: {
            type: "category",
            data: salesData.map((d) => d.month),
          },
          yAxis: { type: "value" },
          series: [
            {
              data: salesData.map((d) => d.sales),
              type: "bar",
              itemStyle: { color: "#2196f3" },
              barWidth: 40,
              label: {
                show: true,
                position: "top",
              },
            },
          ],
        }
      : {
          title: { text: "Đơn hàng theo tháng" },
          tooltip: {},
          xAxis: {
            type: "category",
            data: salesData.map((d) => d.month),
          },
          yAxis: { type: "value" },
          series: [
            {
              data: salesData.map((d) => d.sales),
              type: "line",
              smooth: true,
              lineStyle: { width: 3, color: "#2196f3" },
              symbolSize: 8,
            },
          ],
        };

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg flex-1">
      <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
    </div>
  );
}

export default MyChart;
