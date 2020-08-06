import React from "react";

import Plot from "react-plotly.js";

const YearlyCodeFrequency = (props) => {

  return (
    <Plot
      data={[
        {
          x: props.data.week,
          y: props.data.additions,
          type: "bar",
          name: "Additions",
          "marker.color": "green"
        },
        {
          x: props.data.week,
          y: props.data.deletions,
          type: "bar",
          name: "Deletions",
          "marker.color": "red"
        },
      ]}
      layout={{
        width: "100%",
        title: `Yearly Code Frequency: ${props.repo}`,
        barmode: "overlay"
      }}
    />
  );
};

export default YearlyCodeFrequency;
