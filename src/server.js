const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', '.hbs');
app.engine('.hbs', expbs.engine({   
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs' 
}))

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        style: 'home.css',
        root: ''
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        style: 'about.css',
        root: ''
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Portfolio',
        style: 'portfolio.css',
        root: ''
    });
});

app.get('/curriculum-vitae', (req, res) => {
    res.render('cv', {
        title: 'Curriculum vitae',
        style: 'cv.css',
        root: ''
    });
});

app.get('/proyects', (req, res) => {
    res.render('proyects', {
        title: 'Proyects and more',
        style: 'proyects.css',
        root: ''
    });
});

app.get('/proyects/d3-heat-map', (req, res) => {
    res.render('d3proyect', {
        title: 'Heat Map',
        file: '/d3/heatMap.js',
        style: 'heatMap.css',
        root: '..' // Use '..' to go back one level in the URL for CSS and font files
    });
});

app.get('/proyects/d3-globe-geo-json', (req, res) => {
    res.render('d3Globe-geojson', {
        title: 'Interactive Map',
        file: '/d3/d3Globe-geojson.js',
        style: 'd3Globe-geojson.css',
        root: '..' // Use '..' to go back one level in the URL for CSS and font files
    });
});

app.get('/proyect/d3-choroplet-map', (req, res) => {
    res.render('choroplet-map', {
        title: 'Choroplet Map',
        file: '/d3/choroplet-map.js',
        style: 'choroplet-map.css',
        root: '..' // Use '..' to go back one level in the URL for CSS and font files
    })
})

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})