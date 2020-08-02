import React from "react";

import Plot from "react-plotly.js";

const Top10ContributorsPlot = () => {
  return (
    <Plot
      data={[
        {
          x: data.user,
          y: data.total_commits,
          type: "scatter",
          mode: "markers",
          marker: {
            size: 20,
            color: data.followers,
            showscale: true,
          },
        },
      ]}
      layout={{
        width: "100%",
        title: "Top 10 All-Time Contributors",
        xaxis: {
          tickangle: 45,
        },
        yaxis: {
          title: "Total Commits",
        },
      }}
    />
  );
};

export default Top10ContributorsPlot;
