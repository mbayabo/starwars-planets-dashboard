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

PlanetChart.defaultProps = {
  xAxisData: [],
  yAxisData: [],
  chartTitle: "",
  xAxisTitle: "",
  yAxisTitle: "",
  yAxisScale: "linear",
}

PlanetChart.propTypes = {
  xAxisData: PropTypes.arrayOf(PropTypes.string),
  yAxisData: PropTypes.arrayOf(PropTypes.any),
  chartTitle: PropTypes.string,
  xAxisTitle: PropTypes.string,
  yAxisTitle: PropTypes.string,
  yAxisScale: PropTypes.string,
};

export default PlanetChart;
