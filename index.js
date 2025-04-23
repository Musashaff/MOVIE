import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
let app = express();

let port = 3000;

//path to html file

let __filename = fileURLToPath(import.meta.url);
console.log(__filename);

let __dirname = path.dirname(__filename);
console.log(__dirname);

//Template engine
app.set('views', './views');
app.set('view engine', 'pug');

//Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public",'index.html'));
});

//link static files
app.use( express.static('public'));

//movies route
app.get('/movies', async(req, res) => {
 let movieRes = await fetch("https://api.themoviedb.org/3/discover/movie", {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjJhYzE5YmEyZTVkNDU3NjAzZTRkYTQyMTU3Y2YxMSIsIm5iZiI6MTc0NDM1OTQ5OC44LCJzdWIiOiI2N2Y4ZDA0YWNjZTc2OTAyMzBhZDViMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IRzOn1q6u9mCZzb73MpuOwwmFWS4sL8bwBpNKpUjQFk'
  }
 })

  let movies = await movieRes.json();
  console.log({movies});
  // res.json(movies);

  //Render a template
  res.render("movies", { data: movies.results});
});

//Tv series route
app.get('/series', async(req, res) => {
  let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv", {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjJhYzE5YmEyZTVkNDU3NjAzZTRkYTQyMTU3Y2YxMSIsIm5iZiI6MTc0NDM1OTQ5OC44LCJzdWIiOiI2N2Y4ZDA0YWNjZTc2OTAyMzBhZDViMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IRzOn1q6u9mCZzb73MpuOwwmFWS4sL8bwBpNKpUjQFk'
    }
        });
      
        let series = await seriesRes.json();
        console.log({series});
        res.render("series", { data: series.results });
      });

//Individual  movie route
app.get('/movies/:id', async(req, res) => {
  let id = req.params.id; // Extract id from request parameters
  console.log(id);

  let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjJhYzE5YmEyZTVkNDU3NjAzZTRkYTQyMTU3Y2YxMSIsIm5iZiI6MTc0NDM1OTQ5OC44LCJzdWIiOiI2N2Y4ZDA0YWNjZTc2OTAyMzBhZDViMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IRzOn1q6u9mCZzb73MpuOwwmFWS4sL8bwBpNKpUjQFk"
    }
  });

  let movie = await movieRes.json();
  console.log({movie});
  res.render("movie", { data: movie }); // Pass movie data to the template
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//Individual series route
app.get(`/series/:id`, async(req, res) => {
  let id = req.params.id; // Extract id from request parameters
  console.log(id);

  let serieRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjJhYzE5YmEyZTVkNDU3NjAzZTRkYTQyMTU3Y2YxMSIsIm5iZiI6MTc0NDM1OTQ5OC44LCJzdWIiOiI2N2Y4ZDA0YWNjZTc2OTAyMzBhZDViMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IRzOn1q6u9mCZzb73MpuOwwmFWS4sL8bwBpNKpUjQFk"
    }
  });

  let series = await serieRes.json();
  console.log({series});
  res.render("serie", { data: series }); // Pass movie data to the template
});
