import axios from "axios";
import { listPlanets, listPlanetNames, listAttributeValues } from "./services";

jest.mock("axios");

// This is just a copy of the first 11 planets I requested from the SWAPI
const examplePlanets = [
  {
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
      "https://swapi.dev/api/people/4/",
      "https://swapi.dev/api/people/6/",
      "https://swapi.dev/api/people/7/",
      "https://swapi.dev/api/people/8/",
      "https://swapi.dev/api/people/9/",
      "https://swapi.dev/api/people/11/",
      "https://swapi.dev/api/people/43/",
      "https://swapi.dev/api/people/62/",
    ],
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/",
  },
  {
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
    residents: [
      "https://swapi.dev/api/people/5/",
      "https://swapi.dev/api/people/68/",
      "https://swapi.dev/api/people/81/",
    ],
    films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/6/"],
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
    url: "https://swapi.dev/api/planets/2/",
  },
  {
    name: "Yavin IV",
    rotation_period: "24",
    orbital_period: "4818",
    diameter: "10200",
    climate: "temperate, tropical",
    gravity: "1 standard",
    terrain: "jungle, rainforests",
    surface_water: "8",
    population: "1000",
    residents: [],
    films: ["https://swapi.dev/api/films/1/"],
    created: "2014-12-10T11:37:19.144000Z",
    edited: "2014-12-20T20:58:18.421000Z",
    url: "https://swapi.dev/api/planets/3/",
  },
  {
    name: "Hoth",
    rotation_period: "23",
    orbital_period: "549",
    diameter: "7200",
    climate: "frozen",
    gravity: "1.1 standard",
    terrain: "tundra, ice caves, mountain ranges",
    surface_water: "100",
    population: "unknown",
    residents: [],
    films: ["https://swapi.dev/api/films/2/"],
    created: "2014-12-10T11:39:13.934000Z",
    edited: "2014-12-20T20:58:18.423000Z",
    url: "https://swapi.dev/api/planets/4/",
  },
  {
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    gravity: "N/A",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "unknown",
    residents: [],
    films: [
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:42:22.590000Z",
    edited: "2014-12-20T20:58:18.425000Z",
    url: "https://swapi.dev/api/planets/5/",
  },
  {
    name: "Bespin",
    rotation_period: "12",
    orbital_period: "5110",
    diameter: "118000",
    climate: "temperate",
    gravity: "1.5 (surface), 1 standard (Cloud City)",
    terrain: "gas giant",
    surface_water: "0",
    population: "6000000",
    residents: ["https://swapi.dev/api/people/26/"],
    films: ["https://swapi.dev/api/films/2/"],
    created: "2014-12-10T11:43:55.240000Z",
    edited: "2014-12-20T20:58:18.427000Z",
    url: "https://swapi.dev/api/planets/6/",
  },
  {
    name: "Endor",
    rotation_period: "18",
    orbital_period: "402",
    diameter: "4900",
    climate: "temperate",
    gravity: "0.85 standard",
    terrain: "forests, mountains, lakes",
    surface_water: "8",
    population: "30000000",
    residents: ["https://swapi.dev/api/people/30/"],
    films: ["https://swapi.dev/api/films/3/"],
    created: "2014-12-10T11:50:29.349000Z",
    edited: "2014-12-20T20:58:18.429000Z",
    url: "https://swapi.dev/api/planets/7/",
  },
  {
    name: "Naboo",
    rotation_period: "26",
    orbital_period: "312",
    diameter: "12120",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grassy hills, swamps, forests, mountains",
    surface_water: "12",
    population: "4500000000",
    residents: [
      "https://swapi.dev/api/people/3/",
      "https://swapi.dev/api/people/21/",
      "https://swapi.dev/api/people/35/",
      "https://swapi.dev/api/people/36/",
      "https://swapi.dev/api/people/37/",
      "https://swapi.dev/api/people/38/",
      "https://swapi.dev/api/people/39/",
      "https://swapi.dev/api/people/42/",
      "https://swapi.dev/api/people/60/",
      "https://swapi.dev/api/people/61/",
      "https://swapi.dev/api/people/66/",
    ],
    films: [
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:52:31.066000Z",
    edited: "2014-12-20T20:58:18.430000Z",
    url: "https://swapi.dev/api/planets/8/",
  },
  {
    name: "Coruscant",
    rotation_period: "24",
    orbital_period: "368",
    diameter: "12240",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "cityscape, mountains",
    surface_water: "unknown",
    population: "1000000000000",
    residents: [
      "https://swapi.dev/api/people/34/",
      "https://swapi.dev/api/people/55/",
      "https://swapi.dev/api/people/74/",
    ],
    films: [
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/4/",
      "https://swapi.dev/api/films/5/",
      "https://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T11:54:13.921000Z",
    edited: "2014-12-20T20:58:18.432000Z",
    url: "https://swapi.dev/api/planets/9/",
  },
  {
    name: "Kamino",
    rotation_period: "27",
    orbital_period: "463",
    diameter: "19720",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "ocean",
    surface_water: "100",
    population: "1000000000",
    residents: [
      "https://swapi.dev/api/people/22/",
      "https://swapi.dev/api/people/72/",
      "https://swapi.dev/api/people/73/",
    ],
    films: ["https://swapi.dev/api/films/5/"],
    created: "2014-12-10T12:45:06.577000Z",
    edited: "2014-12-20T20:58:18.434000Z",
    url: "https://swapi.dev/api/planets/10/",
  },
  {
    name: "Geonosis",
    rotation_period: "30",
    orbital_period: "256",
    diameter: "11370",
    climate: "temperate, arid",
    gravity: "0.9 standard",
    terrain: "rock, desert, mountain, barren",
    surface_water: "5",
    population: "100000000000",
    residents: ["https://swapi.dev/api/people/63/"],
    films: ["https://swapi.dev/api/films/5/"],
    created: "2014-12-10T12:47:22.350000Z",
    edited: "2014-12-20T20:58:18.437000Z",
    url: "https://swapi.dev/api/planets/11/",
  },
];

describe("components/App/services", () => {
  describe("listPlanets()", () => {
    test("Should return a count of 0 and an empty planets array if the API totals 0 planets", async () => {
      const fakeResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
      axios.get.mockResolvedValue({ data: fakeResponse });

      const expectedResult = {
        count: 0,
        planets: [],
      };

      const actualResult = await listPlanets(1);

      expect(actualResult).toEqual(expectedResult);
    });

    test("Should return a count of 11 and an array containing 10 planets if the API totals 11 planets and is on page 1", async () => {
      const fakeResponse = {
        count: 11,
        next: "https://swapi.dev/api/planets/?page=2",
        previous: null,
        results: examplePlanets.slice(0, 10),
      };

      axios.get.mockResolvedValue({ data: fakeResponse });

      const { count, planets } = await listPlanets(1);

      expect(count).toEqual(11);
      expect(planets.length).toEqual(10);
    });

    test("Should return a count of 11 and an array containing 1 planet if the API totals 11 planets and is on page 2", async () => {
      const fakeResponse = {
        count: 11,
        next: null,
        previous: "https://swapi.dev/api/planets/?page=1",
        results: examplePlanets.slice(10),
      };

      axios.get.mockResolvedValue({ data: fakeResponse });

      const { count, planets } = await listPlanets(2);

      expect(count).toEqual(11);
      expect(planets.length).toEqual(1);
    });
  });
  describe("listPlanetNames()", () => {
    test("Should return a list of planet names if given an array containing 5 planet objects", () => {
      const result = listPlanetNames(examplePlanets.slice(0, 5));

      expect(result).toEqual(["Tatooine", "Alderaan", "Yavin IV", "Hoth", "Dagobah"]);
    });
  });
  describe("listAttributeValues()", () => {
    test("Should return a list of population values if given an array containing 5 planet objects", () => {
      const result = listAttributeValues(examplePlanets.slice(0,5), "population");

      expect(result).toEqual(["200000", "2000000000", "1000", "unknown", "unknown"])
    });

    test("Should return a list of climate values if given an array containing 5 planet objects", () => {
      const result = listAttributeValues(examplePlanets.slice(0,5), "climate");

      expect(result).toEqual(["arid", "temperate", "temperate, tropical", "frozen", "murky"])
    });
  });
});
