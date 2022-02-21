import axios from "axios";

/**
 * Convets numbers as strings into integers if the string isn't "unknown"
 * @param {string} value The string to be converted into a number
 * @returns An integer or null
 */
function convertToNumber(value) {
  return value !== "unknown" ? parseInt(value, 10) : null;
}

/**
 * Acquires a list of planets and their details from the Star Wars API
 *
 * @param {number} page The page number for acquiring the list of planets
 * @returns An object containing the total number of planets and a list of
 *  planets and their attributes
 */
export async function listPlanets(page) {
  let count = 0;
  let planets = [];
  try {
    // const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`, {
    //   timeout: 1000,
    // });
    const response = await axios.get(`https://swapi.py4e.com/api/planets/?page=${page}`, {
      timeout: 1000,
    });
    planets = response.data.results.map((planet) => ({
      id: planet.name,
      name: planet.name,
      population: convertToNumber(planet.population),
      rotationPeriod: convertToNumber(planet.rotation_period),
      orbitalPeriod: convertToNumber(planet.orbital_period),
      diameter: convertToNumber(planet.diameter),
      climate: planet.climate,
      surfaceWater: convertToNumber(planet.surface_water),
    }));
    count = response.data.count;
  } catch (err) {
    console.log(err);
    console.log("The Star Wars API could not be reached.");
  }
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
