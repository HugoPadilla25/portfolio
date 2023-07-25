const { json, select, selectAll } = d3

const w = 1200;
const h = 500;
const padding = 60;

json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(data => init(data))

const init = data => {
    dataset = data.monthlyVariance

    chart(dataset)
}

const chart = (dataset) => {
    const xScale = d3.scaleLinear()
       .domain([d3.min(dataset, (d) => d.year), d3.max(dataset, (d) => d.year)])
       .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
        .domain([12, 1])
        .range([h - padding, padding]);

    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateRdBu)
        .domain([d3.min(dataset, (d) => 8.66 + d.variance), d3.max(dataset, (d) => 8.66 + d.variance)])
    

    const svg = d3.select("#container-heat")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("data-month", d => d.month - 1)
            .attr("data-year", d => d.year)
            .attr("data-temp", d => d.variance + 8.66)
            .attr("x", (d) => xScale(d.year))
            .attr("y",(d) => yScale(d.month - 1))
            .attr("width", 4)
            .attr("height", 32)
            .style("fill", function(d){
                const temp = 8.66 + d.variance * 3
                return colorScale(temp)
            })
            .on("mouseover", function(e, d){
                tooltip.transition()
                    .style("visibility", "visible")
                    const year = d.year
                    const month = d.month
                    tooltip.html(`<h1>${year} - ${month}</h1><hr><p>${year}</p>`)

                    tooltip.attr("data-year", d.year)
            })
            .on("mouseout", (d) => {
                tooltip.transition()
                    .style("visibility", "hidden")
            })

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale).tickFormat(function(d) {
        const meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return meses[d - 1];
    })

    svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .attr("id", "x-axis")
            .call(xAxis);

    svg.append("g")
            .attr("transform", "translate(" + (padding) + ",0)")
            .attr("id", "y-axis")
            .call(yAxis);



            
     const scala = d3.scaleLinear()
            .domain([d3.min(dataset, (d) => 8.66 + d.variance), d3.max(dataset, (d) => 8.66 + d.variance)])
            .range([0, 300])
    
    const legScala = d3.axisBottom(scala);

    const legend = svg.append("g")
            .attr("transform", "translate(60," + (h - padding + 40) + ")")
            .attr("id", "legend")
            .call(legScala);

    legend.selectAll("rect")
            .data(scala.ticks())
            .enter()
            .append("rect")
            .attr("x", d => scala(d))
            .attr("y", -21)
            .attr("width", scala(scala.ticks()[1]) - scala(scala.ticks()[0]))
            .attr("height", 20)
            .style("fill", d => colorScale(d));

    tooltip = d3.select("#container-heat")
            .append("div")
            .attr("id", "tooltip")
            
    

}

    
