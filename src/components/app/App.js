import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Stack, Container, Divider } from "@mui/material";
import axios from "axios";
import Plot from "react-plotly.js";

async function listPlanets(page) {
  const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
  const planets = response.data.results.map((planet) => ({
    id: planet.name,
    name: planet.name,
    population:
      planet.population !== "unknown"
        ? parseInt(planet.population, 10).toLocaleString("en-US")
        : null,
    rotationPeriod: planet.rotation_period,
    orbitalPeriod: planet.orbital_period,
    diameter: planet.diameter,
    climate: planet.climate,
    surfaceWater: planet.surface_water,
  }));
  const { count } = response.data;
  return { count, planets };
}

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 125,
  },
  {
    field: "population",
    headerName: "Population",
    width: 135,
  },
  {
    field: "rotationPeriod",
    headerName: "Rotation Period",
    width: 130,
  },
  {
    field: "orbitalPeriod",
    headerName: "Orbital Period",
    width: 130,
  },
  {
    field: "diameter",
    headerName: "Diameter",
    width: 90,
  },
  {
    field: "climate",
    headerName: "Climate",
    width: 150,
  },
  {
    field: "surfaceWater",
    headerName: "Surface Water",
    width: 130,
  },
];

function App() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);

    const { count, planets } = await listPlanets(page);
    setTotalPlanets(count);
    setRows(planets);

    setIsLoading(false);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const getXData = () => rows.map((planet) => planet.name);
  const getYData = (field = "population") => rows.map((planet) => planet[field]);

  return (
    <Stack
      direction={{ xs: "column", sm: "column", lg: "row" }}
      spacing={{ sm: 0.5, lg: 2 }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Container spacing={0}>
        <Plot
          data={[{ x: getXData(), y: getYData(), type: "bar" }]}
          layout={{
            autosize: true,
            title: "Planet vs Population",
            xaxis: { title: "Planets", categoryorder: "category ascending" },
            yaxis: { title: "Population" },
          }}
        />
      </Container>
      <Container style={{ height: 500 }} spacing={0}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          pagination
          rowCount={totalPlanets}
          paginationMode="server"
          onPageChange={handlePageChange}
          loading={isLoading}
          initialState={{
            sorting: {
              sortModel: [{ field: "name", sort: "asc" }],
            },
          }}
        />
      </Container>
    </Stack>
  );
}

export default App;
