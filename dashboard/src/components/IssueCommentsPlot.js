import React from "react";

import Plot from "react-plotly.js";

const IssueCommentsPlot = (props) => {

  return (
    <Plot
      data={[
        {
          x: props.data.created_at,
          y: props.data.total_comments,
          type: "scatter",
          mode: "markers",
          marker: {
            size: props.data.body_length, 
            sizemode: 'area',
            sizeref: 2*Math.max(props.data.body_length)/(40**2),
            sizemin: 4
          },
          hovertemplate:
          "Date Created: %{x}<br>" +
          "Body Length: %{marker.size}<br>" +
          "Total Comments: %{y}<br>" +
          "<extra></extra>",
        },
      ]}
      layout={{
        width: "100%",
        title: `Issue Comments for the Past 7 Days: ${props.repo}`,
        barmode: "stack",
        xaxis: {
          title: "Date Created"
        },
        yaxis: {
          title: "Total Comments",
        },
      }}
    />
  );
};

export default IssueCommentsPlot;
