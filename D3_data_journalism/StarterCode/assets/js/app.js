// @TODO: YOUR CODE HERE!

var svgWidth = 600;
var svgHeight = 400;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function (data) {

    console.log(data);

    data.forEach(function (d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;

    });

    // Parse data
    var id = data.map(data => data.id);
    // console.log("ID", id);

    var state = data.map(data => data.abbr);
    // console.log("State", state);

    var poverty = data.map(data => data.poverty);
    // console.log("Poverty", poverty);

    var povertyMoe = data.map(data => data.povertyMoe);
    // console.log("Poverty MOE", povertyMoe);

    var age = data.map(data => data.age);
    // console.log("Age", age);

    var ageMoe = data.map(data => data.ageMoe);
    // console.log("Age MOE", ageMoe);

    var income = data.map(data => data.income);
    // console.log("Income", income);

    var incomeMoe = data.map(data => data.incomeMoe);
    // console.log("Income MOE", incomeMoe);

    var health = data.map(data => data.healthcare);
    // console.log("Health", health);

    var healthLow = data.map(data => data.healthcareLow);
    // console.log("Health Low", healthLow);

    var healthHigh = data.map(data => data.healthcareHigh);
    // console.log("Health High", healthHigh);

    var obesity = data.map(data => data.obesity);
    // console.log("Obesity", obesity);

    var obesityLow = data.map(data => data.obesityLow);
    // console.log("Obesity Low", obesityLow);

    var obesityHigh = data.map(data => data.obesityHigh);
    // console.log("Obesity High", obesityHigh);

    var smoke = data.map(data => data.smokes);
    // console.log("Smoke", smoke);

    var smokeLow = data.map(data => data.smokesLow);
    // console.log("Smoke Low", smokeLow);

    var smokeHigh = data.map(data => data.smokesHigh);
    // console.log("Smoke High", smokeHigh);

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "lightblue")

    chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare))
        .attr("r", "9")
        .attr("fill", "black")
        .text(function (d) { return d.abbr });
        console.log(circlesGroup);

    // Step 1: Append tooltip div
    var toolTip = d3.select("body")
        .append("div")
        .classed("tooltip", true);

    // Create "mouseover" event listener to display tooltip
    // circlesGroup.on("mouseover", function (d) {
    //     toolTip.style("display", "block")
    //         .html(
    //             `<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
    //           medal(s) won`)
    //         .style("left", d3.event.pageX + "px")
    //         .style("top", d3.event.pageY + "px");
    // })

    // Step 3: Create "mouseout" event listener to hide tooltip
    //   .on("mouseout", function() {
    //     toolTip.style("display", "none");
    //   });

    /* Create the text for each block */
    // circlesGroup
    //     .enter()
    //     .attr("dx", function (d) { return -20 })
    //     .text(function (d) { return d.abbr });


    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

    /*Create and place the "blocks" containing the circle and the text */
    // var elemEnter = elem.enter()
    //     .append("g")
    //     .attr("transform", function (d) { return "translate(" + d.abbr + ",80)" })

    /*Create the circle for each block */
    // var circle = elemEnter.append("circle")
    //     .attr("r", function (d) { return d.abbr })
    //     .attr("stroke", "black")
    //     .attr("fill", "white")

    // /* Create the text for each block */
    // elemEnter.append("text")
    //     .attr("dx", function (d) { return -20 })


}).catch(function (error) {
    console.log(error);
});