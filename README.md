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

### Why I chose to do it this way
In big datasets (100k+ or more), fetching every planet, sorting them, then showing 10 at a time is incredibly inefficient. If I had full control of both the API and the frontend, I'd have the planets sorted by name using the API then displayed on the tables, resulting in a truly alphabetical table. Eg. `https://swapi.dev/api/planets/?page=1&ordering=name`. However, this API doesn't seem to have that feature.

### How would I do it the other way?
I can query every planet by sending a GET request to `https://swapi.dev/api/planets/` which should give me the first page. Using the "next" key from the JSON response object, I can query the next page. I keep doing this until "next" is `null`. After I have all of the planets, I simply sort them using JavaScript. Then on the table, I display the first 10.

### Alternative options
I can also simply scrape the API first, then dump it into my own database where I'd have full control of the data.

## Chart

### Chart Attribute Selection
The attribute can be selected using the buttons on the top of the page. I've neglected to create a "Climate" chart as I don't think it really needed it.

### Types
The Population chart is displayed in logarithmic scale. Everything else is displayed linearly.

## [Demo](https://mbayabo.github.io/starwars-planets-dashboard/)
The demo is deployed on Github pages using the `gh-pages` package.

 