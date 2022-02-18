import axios from "axios";

/**
 * Acquires a list of planets and their details from the Star Wars API
 *
 * @param {number} page The page number for acquiring the list of planets
 * @returns An object containing the total number of planets and a list of
 *  planets and their attributes
 */
export async function listPlanets(page) {
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
export function listPlanetNames(planets) {
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
export function listAttributeValues(planets, attribute) {
  return planets.map((planet) => planet[attribute]);
}
