# Star Wars Planets Dashboard

## Task List
 - [x] Fetch planets from SWAPI and show as a table
 - [x] Display a bar chart of planet populations
 - [x] Order table by planet names
 - [x] Order chart by planet names
 - [x] Pagination for the table
 - [x] Ability to choose different graph attributes
 - [x] Some testing

## Planets Table

### Selecting pages
The page can be changed using the "<" and ">" buttons on the bottom right. It also shows pagination information.

### Handling Pagination
Pagination is handled by the Star Wars API itself. Therefore, 10 planets are fetched first, then the page sorts them. This is different from fetching every planet first, sorting them, then displaying them 10 at a time.

### Why client-side sorting?
In big datasets (100k+ or more), fetching every planet, sorting them, then showing 10 at a time is incredibly inefficient. If I had full control of both the API and the frontend, I'd have the planets sorted by name using the API (server-side sorting) then displayed on the tables, resulting in a truly alphabetical table. Eg. `https://swapi.dev/api/planets/?page=1&ordering=name`. However, this API doesn't seem to have that feature.

### How could I do client-side sorting a different way?
I can query every planet by sending a GET request to `https://swapi.dev/api/planets/` which should give me the first page. Using the "next" key from the JSON response object, I can query the next page. I keep doing this until "next" is `null`. After I have all of the planets, I simply sort them using JavaScript. Then on the table, I display the first 10.

### Alternative options
1. Server-size sorting (My preferred solution)
2. I can also simply scrape the API first, then dump it into a database where I'd have full control of the data.

## Chart

### Chart Attribute Selection
The attribute can be selected using the buttons on the top of the page. I've neglected to create a "Climate" chart as I don't think it needed it.

### Types
The Population chart is displayed on a logarithmic scale. Everything else is displayed linearly.

## SWAPI.DEV issues
The SWAPI.DEV API might be down. If it is, there's an alternative star wars API that's almost the same except it adds "Jakku" as the 61st planet. `https://swapi.py4e.com/api/`. I've also found the source code for the star wars API and could deploy it. I ultimately decided not to do this as a suitable alternative was found.

## [Demo](https://mbayabo.github.io/starwars-planets-dashboard/)
The demo is deployed on Github pages using the `gh-pages` package.