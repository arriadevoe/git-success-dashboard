import React from "react";

import Plot from "react-plotly.js";

const IssueActivityPlot = (props) => {

  return (
    <Plot
      data={[
        {
          x: props.data.day,
          y: props.data.commits,
          type: "bar",
        },
      ]}
      layout={{
        width: "100%",
        title: `Last Week's Daily Commits: ${props.repo}`,
        yaxis: {
          title: "Total Commits",
        },
      }}
    />
  );
};

export default IssueActivityPlot;
