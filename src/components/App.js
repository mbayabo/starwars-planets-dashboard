import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container, Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import PeopleIcon from "@mui/icons-material/People";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import PublicIcon from "@mui/icons-material/Public";
import WavesIcon from "@mui/icons-material/Waves";
import StraightenIcon from "@mui/icons-material/Straighten";

import axios from "axios";
import Plot from "react-plotly.js";

/**
 * Acquires a list of planets and their details from the Star Wars API
 *
 * @param {number} page The page number for acquiring the list of planets
 * @returns An object containing the total number of planets and a list of
 *  planets and their attributes
 */
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

/**
 * Returns a list of planet names from the planet list
 *
 * @param {object} planets An array of planets and their details
 * @returns An array of planet names
 */
function listPlanetNames(planets) {
  return planets.map((planet) => planet.name);
}

/**
 * Returns a list of values from the planet list based on the
 * given attribute
 *
 * @param {array} planets The array of planets with their attributes and values
 * @param {string} attribute The attribute whose value must be listed
 * @returns An array of attributes
 */
function listAttributeValues(planets, attribute) {
  return planets.map((planet) => planet[attribute]);
}

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 125,
  },
  {
    field: "population",
    headerName: "Population",
    minWidth: 135,
  },
  {
    field: "rotationPeriod",
    headerName: "Rotation Period",
    minWidth: 130,
  },
  {
    field: "orbitalPeriod",
    headerName: "Orbital Period",
    minWidth: 130,
  },
  {
    field: "diameter",
    headerName: "Diameter",
    minWidth: 90,
  },
  {
    field: "climate",
    headerName: "Climate",
    minWidth: 150,
  },
  {
    field: "surfaceWater",
    headerName: "Surface Water",
    minWidth: 130,
  },
];

const chartTitles = {
  population: "Population",
  rotationPeriod: "Rotation Period",
  orbitalPeriod: "Orbital Period",
  diameter: "Diameter",
  surfaceWater: "Surface Water",
};

function App() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [currentAttribute, setCurrentAttribute] = useState("population");
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

  const handleAttributeChange = (event, newValue) => {
    setCurrentAttribute(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentAttribute}
          aria-label="basic tabs example"
          centered
          onChange={handleAttributeChange}
        >
          <Tab value="population" label="Population" icon={<PeopleIcon />} />
          <Tab value="rotationPeriod" label="Rotation Period" icon={<ThreeSixtyIcon />} />
          <Tab value="orbitalPeriod" label="Orbital Period" icon={<PublicIcon />} />
          <Tab value="diameter" label="Diameter" icon={<StraightenIcon />} />
          {/* <Tab value="climate" label="Climate" icon={<CloudIcon />} /> */}
          <Tab value="surfaceWater" label="Surface Water" icon={<WavesIcon />} />
        </Tabs>
      </Box>
      <Container spacing={0} style={{ width: "auto" }}>
        <Plot
          data={[
            {
              x: listPlanetNames(rows),
              y: listAttributeValues(rows, currentAttribute),
              type: "bar",
            },
          ]}
          layout={{
            title: `Planet vs ${chartTitles[currentAttribute]}`,
            xaxis: { title: "Planets", categoryorder: "category ascending", automargin: true },
            yaxis: { title: chartTitles[currentAttribute], automargin: true },
          }}
          config={{ displayModeBar: false }}
          style={{ width: "100%" }}
        />
      </Container>
      <Container style={{ width: "auto", height: 400 }} spacing={0}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
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
    </>
  );
}

export default App;
