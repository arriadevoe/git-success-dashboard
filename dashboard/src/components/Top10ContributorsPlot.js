import React from "react";

import Plot from "react-plotly.js";

const Top10ContributorsPlot = (props) => {
  return (
    <Plot
      data={[
        {
          x: props.data.user,
          y: props.data.total_commits,
          text: props.data.followers,
          type: "scatter",
          mode: "markers",
          marker: {
            size: 20,
            color: props.data.followers,
            showscale: true,
          },
          hovertemplate:
            "<b>%{x}</b><br>" +
            "Followers: %{text}<br>" +
            "<extra></extra>",
        },
      ]}
      layout={{
        width: "100%",
        title: `Top 10 All-Time Contributors: ${props.repo}`,
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
