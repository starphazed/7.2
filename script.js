function generateTemperatureData(startYear, endYear) {
    const data = [];
    let baseTemp = 14; 
    const warmingRate = 0.02; 
  
    for (let year = startYear; year <= endYear; year++) {
      const avgTemp = parseFloat((baseTemp + warmingRate * (year - startYear)).toFixed(2));
      const highTemp = parseFloat((avgTemp + Math.random() * 2).toFixed(2)); 
      const lowTemp = parseFloat((avgTemp - Math.random() * 2).toFixed(2)); 
  
      data.push({ year, avg: avgTemp, high: highTemp, low: lowTemp });
    }
    return data;
  }
  
  const dataset = generateTemperatureData(2000, 2050);
  
  const svgWidth = 800, svgHeight = 400;
  const margin = { top: 40, right: 40, bottom: 40, left: 60 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  
  const svg = d3.select("#scatter-chart")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const xScale = d3.scaleLinear()
    .domain([2000, 2050]) 
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([12, 18]) 
    .range([height, 0]);
  
  function makeXGridlines() {
    return d3.axisBottom(xScale).ticks(10);
  }
  
  function makeYGridlines() {
    return d3.axisLeft(yScale).ticks(6);
  }
  
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0,${height})`)
    .call(makeXGridlines()
      .tickSize(-height)
      .tickFormat(""));
  
  svg.append("g")
    .attr("class", "grid")
    .call(makeYGridlines()
      .tickSize(-width)
      .tickFormat(""));
  
  svg.selectAll(".avg")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "avg")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.avg))
    .attr("r", 8)
    .attr("fill", "purple")
    .attr("opacity", 0.5);
  
  svg.selectAll(".high")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "high")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.high))
    .attr("r", 8)
    .attr("fill", "hotpink")
    .attr("opacity", 0.5);
  
  svg.selectAll(".low")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "low")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.low))
    .attr("r", 8)
    .attr("fill", "blue")
    .attr("opacity", 0.5);
  
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")));
  
  svg.append("g")
    .call(d3.axisLeft(yScale).ticks(6));
  
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 5)
    .attr("text-anchor", "middle")
    .text("Year")
    .attr("fill", "#555")
    .style("font-size", "14px");
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 15)
    .attr("text-anchor", "middle")
    .text("Temperature (°C)")
    .attr("fill", "#555")
    .style("font-size", "14px");
  