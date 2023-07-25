const { json, select, selectAll, geoOrthographic, geoPath } = d3

const countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
const educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

let countyData, educationData, h, w, padding

h = 600
w = 950
padding = 50

d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(log)
        }else{
            countyData = topojson.feature(data, data.objects.counties)
            console.log(countyData)

            d3.json(educationURL).then(
                (data, error) => {
                    if(error){
                        console.log(error)
                    }else{
                        educationData = data
                        console.log(educationData)
                        drawMap(countyData)
                    }
                }
            )
        }
    }
)

const drawMap = (countyData) => {
    
    const svg = d3.select('#container-ch')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

    const tooltip = d3.select("#container-ch")
            .append("div")
            .attr("id", "tooltip")
            .style('height', 'auto')
            .style('width', 'auto')
            .style("visibility", "hidden");

        svg.selectAll('path')
            .data(countyData.features)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (countyDataItem) => {
                let id = countyDataItem['id']
                let county = educationData.find((item) => {
                    return item['fips'] === id
                })
                let percentage = county['bachelorsOrHigher']
                if (percentage <= 15){
                    return 'rgb(164, 206, 164)'
                } else if (percentage <=30){
                    return 'rgb(105, 173, 105)'
                } else if (percentage <= 45){
                    return 'rgb(41, 163, 41)'
                } else {
                    return 'green'
                }
            })
            .attr('data-fips', (countyDataItem) => {
                return countyDataItem['id']
            })
            .attr('data-education', (countyDataItem) => {
                let id = countyDataItem['id']
                let county = educationData.find((item) => {
                    return item['fips'] === id
                })
                let percentage = county['bachelorsOrHigher']
                return percentage
            })
            .on('mouseover', (e, countyDataItem) => {
                tooltip.transition()
                    .style('visibility', 'visible')

                let id = countyDataItem['id']
                let county = educationData.find((item) => {
                    return item['fips'] === id
                })

                tooltip.text(county['fips'] + ' - ' + county['area_name'] + ', ' + county['state'] + ' : ' + county['bachelorsOrHigher'] + '%')

                tooltip.attr('data-education', county['bachelorsOrHigher'])
            })
            .on('mouseout', (countyDataItem) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })


        
}