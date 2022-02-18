import { render, fireEvent, waitFor, screen, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { listPlanets, listPlanetNames, listAttributeValues } from "./services";

import App from "./App";

const fakePlanets = [
  {
    id: "Tatooine",
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
  },
  {
    id: "Alderaan",
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
  },
  {
    id: "Yavin IV",
    name: "Yavin IV",
    rotation_period: "24",
    orbital_period: "4818",
    diameter: "10200",
    climate: "temperate, tropical",
    terrain: "jungle, rainforests",
    surface_water: "8",
    population: "1000",
  },
  {
    id: "Hoth",
    name: "Hoth",
    rotation_period: "23",
    orbital_period: "549",
    diameter: "7200",
    climate: "frozen",
    terrain: "tundra, ice caves, mountain ranges",
    surface_water: "100",
    population: "unknown",
  },
  {
    id: "Dagobah",
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "unknown",
  },
  {
    id: "Bespin",
    name: "Bespin",
    rotation_period: "12",
    orbital_period: "5110",
    diameter: "118000",
    climate: "temperate",
    terrain: "gas giant",
    surface_water: "0",
    population: "6000000",
  },
  {
    id: "Endor",
    name: "Endor",
    rotation_period: "18",
    orbital_period: "402",
    diameter: "4900",
    climate: "temperate",
    terrain: "forests, mountains, lakes",
    surface_water: "8",
    population: "30000000",
  },
  {
    id: "Naboo",
    name: "Naboo",
    rotation_period: "26",
    orbital_period: "312",
    diameter: "12120",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grassy hills, swamps, forests, mountains",
    surface_water: "12",
    population: "4500000000",
  },
  {
    id: "Coruscant",
    name: "Coruscant",
    rotation_period: "24",
    orbital_period: "368",
    diameter: "12240",
    climate: "temperate",
    terrain: "cityscape, mountains",
    surface_water: "unknown",
    population: "1000000000000",
  },
  {
    id: "Kamino",
    name: "Kamino",
    rotation_period: "27",
    orbital_period: "463",
    diameter: "19720",
    climate: "temperate",
    terrain: "ocean",
    surface_water: "100",
    population: "1000000000",
  },
  {
    id: "Geonosis",
    name: "Geonosis",
    rotation_period: "30",
    orbital_period: "256",
    diameter: "11370",
    climate: "temperate, arid",
    terrain: "rock, desert, mountain, barren",
    surface_water: "5",
    population: "100000000000",
  },
];

// Mock all top level functions, such as get, put, delete and post:
jest.mock("./services");

describe("App", () => {
  describe("render()", () => {
    beforeEach(() => {});

    afterEach(() => {
      cleanup();
    });

    test("Should load the page in the population tab with cells loaded", async () => {
      const fakeListPlanetsResult = {
        count: 11,
        planets: fakePlanets,
      };

      listPlanets.mockResolvedValue(fakeListPlanetsResult);

      render(<App />);

      await waitFor(() => {
        // Make sure that the first page of data is loaded
        expect(screen.getByRole("cell", { name: /Alderaan/i })).toBeInTheDocument();
        expect(screen.queryByRole("cell", { name: /Geonosis/i })).toBe(null);

        const populationTab = screen.getByLabelText("Population Tab");
        const rotationPeriodTab = screen.getByLabelText("Rotation Period Tab");
        const orbitalPeriodTab = screen.getByLabelText("Orbital Period Tab");
        const diameterTab = screen.getByLabelText("Diameter Tab");
        const surfaceWaterTab = screen.getByLabelText("Surface Water Tab");

        // Make sure Population Tab is active on first load
        expect(populationTab.classList.contains("Mui-selected")).toBe(true);
        expect(rotationPeriodTab.classList.contains("Mui-selected")).toBe(false);
        expect(orbitalPeriodTab.classList.contains("Mui-selected")).toBe(false);
        expect(diameterTab.classList.contains("Mui-selected")).toBe(false);
        expect(surfaceWaterTab.classList.contains("Mui-selected")).toBe(false);
      });
    });

    test("Should change attributes when `Rotation Period` button is clicked", async () => {
      const fakeListPlanetsResult = {
        count: 11,
        planets: fakePlanets,
      };

      listPlanets.mockResolvedValue(fakeListPlanetsResult);

      render(<App />);

      await waitFor(() => {
        fireEvent.click(screen.getByLabelText("Rotation Period Tab"));
        expect(screen.getByText("Rotation Period vs Planet")).toBeInTheDocument();
      });
    });

    test("Should change attributes when `Population` button is clicked", async () => {
      const fakeListPlanetsResult = {
        count: 11,
        planets: fakePlanets,
      };

      listPlanets.mockResolvedValue(fakeListPlanetsResult);

      render(<App />);

      await waitFor(() => {
        fireEvent.click(screen.getByLabelText("Rotation Period Tab"));
        fireEvent.click(screen.getByLabelText("Population Tab"));
        expect(screen.queryByText("Rotation Period vs Planet")).toBe(null);
        expect(screen.getByText("Population vs Planet")).toBeInTheDocument();
      });
    });
  });
});
