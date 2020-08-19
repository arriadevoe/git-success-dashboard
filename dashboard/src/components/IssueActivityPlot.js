import React from "react";

import Plot from "react-plotly.js";

const IssueActivityPlot = (props) => {

  return (
    <Plot
      data={[
        {
          x: props.data.open_issues.created_at,
          y: props.data.open_issues.issue_count,
          type: "bar",
          name: "Open Issues",
          marker_color: "green"
        },
        {
          x: props.data.closed_issues.created_at,
          y: props.data.closed_issues.issue_count,
          type: "bar",
          name: "Closed Issues",
          marker_color: "red"
        },
      ]}
      layout={{
        width: "100%",
        title: `Issue Activity for the Past 30 Days: ${props.repo}`,
        barmode: "stack",
        xaxis: {
          title: "Date Created"
        },
        yaxis: {
          title: "Count",
        },
      }}
    />
  );
};

export default IssueActivityPlot;
