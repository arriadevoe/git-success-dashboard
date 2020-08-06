import React from "react";

import Plot from "react-plotly.js";

const YearlyCommitActivityPlot = (props) => {

  return (
    <Plot
      data={[
        {
          x: props.data.week,
          y: props.data.total_commits,
          type: "bar",
        },
      ]}
      layout={{
        width: "100%",
        title: `Yearly Commit Activity: ${props.repo}`,
        // xaxis: {
        //   tickangle: 45,
        // },
        yaxis: {
          title: "Total Commits",
        },
      }}
    />
  );
};

export default YearlyCommitActivityPlot;
