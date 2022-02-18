export const COLUMNS = [
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

export const CHART_CONFIG = {
  population: {
    title: "Population",
    type: "log",
  },
  rotationPeriod: {
    title: "Rotation Period",
    type: "linear",
  },
  orbitalPeriod: {
    title: "Orbital Period",
    type: "linear",
  },
  diameter: {
    title: "Diameter",
    type: "linear",
  },
  surfaceWater: {
    title: "Surface Water",
    type: "linear",
  },
};
