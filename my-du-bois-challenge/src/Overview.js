import React, { useEffect } from "react";
import * as d3 from "d3";

export default function GetOverview() {
  useEffect(() => {
    const data = [
      { label: "Red", value: 10 },
      { label: "Black", value: 10 },
      { label: "Green", value: 10 },
    ];

    const width = 800;
    const height = 600;

    const svg = d3.select("#overview-chart svg").empty()
      ? d3.select("#overview-chart").append("svg")
      : d3.select("#overview-chart svg").html("");

    svg.attr("width", width).attr("height", height);

    const margin = { top: 30, right: 10, bottom: 30, left: 10 };
    const innerWidth = 40;
    const innerHeight = height - 2 * margin.top - 2 * margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerHeight])
      .padding(0);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 300)
      .attr("y", (d) => yScale(d.label))
      .attr("width", (d) => xScale(d.value))
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => d.label);

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", innerHeight / 6)
      .attr("dy", 0)
      .style("font-family", "Open Sans")
      .attr("font-size", "30px")
      .attr("font-weight", "bold")
      .text("Du Bois Challenge 2024")
      .call(wrap, 120);

    svg
      .append("text")
      .attr("x", 50)
      .attr("y", height / 2 - margin.top)
      .attr("dy", 0)
      .style("font-family", "Open Sans")
      .attr("font-size", "24px")
      .text("Red, Black, and Green");

    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em");
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    const imageWidth = 140;
    const imageHeight = imageWidth;
    const xWeek1 = 360;
    const yWeek1 = 35;

    svg
      .append("image")
      .attr("xlink:href", "./image1.png")
      .attr("width", imageWidth)
      .attr("height", imageHeight)
      .attr("x", xWeek1)
      .attr("y", yWeek1);

    svg
      .append("text")
      .attr("x", xWeek1 + imageWidth / 2 - 20)
      .attr("y", imageHeight + yWeek1 + 15)
      .style("font-family", "Open Sans")
      .attr("font-size", "12px")
      .text("Week 1");

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", height - innerHeight / 5)
      .style("font-family", "Open Sans")
      .attr("font-size", "16px")
      .text("Created by Isin Kosemen");
  }, []);

  return <div id="overview-chart"></div>;
}
