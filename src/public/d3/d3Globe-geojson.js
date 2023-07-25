const { json, select, selectAll, geoOrthographic, geoPath, geoGraticule } = d3

let geojson, globe, projection, path, infoPanel, isMouseDown = false, rotation = {x: 0, y: 0}

const globeSize = {
    w: window.innerWidth / 2.5,
    h: window.innerHeight
}

json('https://assets.codepen.io/911796/custom.geo.json').then(data => init(data))

const init = data => {
    geojson = data
    drawGlobe() //Dibujo del globo terraqueo
    drawGraticule() //Dibujo de malla del globo terraqueo
    renderInfoPanel() //Visualisar informacion de los paises 
    createHoverEffect() //Interacion con los paises del globo
    createDraggingEvents() //Interacion y arrastre de toda la maqueta

}

const drawGlobe = () => {
    globe = select('#container-globe')
        .append('svg')
        .attr('width', window.innerWidth)
        .attr('height', window.innerHeight)

    projection = geoOrthographic()
        .fitSize([globeSize.w, globeSize.h ], geojson)
        .translate([window.innerWidth - globeSize.w , window.innerHeight / 2])

    path = geoPath().projection(projection)

    globe
        .selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', '#33415c')
        .style('stroke', '#11013a')
        .attr('class', 'country')
}

const drawGraticule = () => {
    graticule = geoGraticule()

    globe
        .append('path')
        .attr('class', 'graticule')
        .attr('d', path(graticule()))
        .attr('fill', 'none')
        .attr('stroke', '#232323')
}

const renderInfoPanel = () => infoPanel = select('body').append('article').attr('class', 'info')

const createHoverEffect = () => {
    globe
        .selectAll('.country')
        .on('mouseover', function(e, d){
            const { formal_en, economy } = d.properties
            infoPanel.html(`<h4>${formal_en}</h4><hr><p>${economy}</p>`)
            globe.selectAll('.country').style('fill', '#33415c').style('stroke', '#11013a')
            select(this).style('fill', '#6ea9ff').style('stroke', 'white')
        })
}

const createDraggingEvents = () => {
    globe
        .on('mousedown', () => isMouseDown = true) 
        .on('moseup', () => isMouseDown = false)
        .on('mousemove', e => {

            if (isMouseDown) {
                const { movementX, movementY } = e

                rotation.x += movementX / 2
                rotation.y += movementY / 2

                projection.rotate([rotation.x, rotation.y])
                selectAll('.country').attr('d', path)
                selectAll('.graticule').attr('d', path(graticule()))
            }    
        })
}