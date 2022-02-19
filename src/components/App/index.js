import { useEffect, useState } from "react";

// import { DataGrid } from "@mui/x-data-grid";
// import { Container } from "@mui/material";

import { listPlanets, listPlanetNames, listAttributeValues } from "./services";
import { CHART_CONFIG, COLUMNS } from "./constants";

import Navigation from "../Navigation";
import PlanetChart from "../PlanetChart";
import PlanetTable from "../PlanetTable";

function App() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [currentAttribute, setCurrentAttribute] = useState("population");
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    listPlanets(page).then(({ count, planets }) => {
      if (isMounted) {
        if (totalPlanets !== count) {
          setTotalPlanets(count);
        }
        setRows(planets);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const handleAttributeChange = (event, newValue) => {
    setCurrentAttribute(newValue);
  };

  return (
    <>
      <Navigation currentAttribute={currentAttribute} onChange={handleAttributeChange} />
      <PlanetChart
        xAxisData={listPlanetNames(rows)}
        yAxisData={listAttributeValues(rows, currentAttribute)}
        chartTitle={`${CHART_CONFIG[currentAttribute].title} vs Planet`}
        xAxisTitle="Planets"
        yAxisTitle={CHART_CONFIG[currentAttribute].title}
        yAxisScale={CHART_CONFIG[currentAttribute].type}
      />
      <PlanetTable
        totalPlanets={totalPlanets}
        rows={rows}
        columns={COLUMNS}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
