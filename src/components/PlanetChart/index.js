import { Container } from "@mui/material";

import Plot from "react-plotly.js";

import PropTypes from "prop-types";

function PlanetChart(props) {
  const { xAxisData, yAxisData, chartTitle, xAxisTitle, yAxisTitle, yAxisScale } = props;

  return (
    <Container spacing={0} style={{ width: "auto" }}>
      <Plot
        data={[
          {
            x: xAxisData,
            y: yAxisData,
            type: "bar",
          },
        ]}
        useResizeHandler
        layout={{
          title: chartTitle,
          xaxis: { title: xAxisTitle, categoryorder: "category ascending", automargin: true },
          yaxis: {
            title: yAxisTitle,
            automargin: true,
            type: yAxisScale,
          },
        }}
        config={{ displayModeBar: false }}
        style={{ width: "100%" }}
      />
    </Container>
  );
}

PlanetChart.propTypes = {
  xAxisData: PropTypes.arrayOf(PropTypes.string).isRequired,
  yAxisData: PropTypes.arrayOf(PropTypes.any).isRequired,
  chartTitle: PropTypes.string.isRequired,
  xAxisTitle: PropTypes.string.isRequired,
  yAxisTitle: PropTypes.string.isRequired,
  yAxisScale: PropTypes.string.isRequired,
};

export default PlanetChart;
