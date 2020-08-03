import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";

const Top10ContributorsPlot = () => {

  useEffect(() => {
    fetch(
      "http://0.0.0.0:5000/visualization/top10contributors/kubernetes/kubernetes",
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_GH_TOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Success", response);
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  
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
