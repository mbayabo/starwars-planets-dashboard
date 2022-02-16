import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

async function listPlanets(page) {
  const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
  const planets = response.data.results.map((planet) => ({
    id: planet.name,
    name: planet.name,
    population: planet.population,
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
    width: 155,
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

  return (
    <div style={{ height: 500, width: "100%", maxWidth: 1000}}>
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
    </div>
  );
}

export default App;
