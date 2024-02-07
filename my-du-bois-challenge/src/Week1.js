import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import georgiaCoordinates from "./georgiaCoordinates.json";

const Week1 = () => {
  console.log(georgiaCoordinates);
  useEffect(() => {
    const width = 700;
    const height = 900;

    const svg = d3
      .select("#week1-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const backgroundColor = "#e4d4c4";

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", backgroundColor);

    const projection = d3
      .geoMercator()
      .fitSize(
        [width, height / 3],
        topojson.feature(
          georgiaCoordinates,
          georgiaCoordinates.objects[
            "DuBoisChallenge - Georgia Counties w 1870 & 1880 data"
          ]
        )
      );

    const pathGenerator = d3.geoPath().projection(projection);

    const categoryColors = {
      "20000 - 30000": "blue",
      "15000 - 20000": "brown",
      "10000 - 15000": "tan",
      "5000 - 10000": "red",
      "2500 - 5000": "lightpink",
      "1000 - 2500": "yellow",
      "> 1000": "green",
    };

    const circleRadius = 12;
    const circleX = 80;
    const blueCircleY = 130;
    const padding = 50;
    const brownCircleY = blueCircleY + padding;
    const tanCircleY = brownCircleY + padding;
    const redCircleY = 500;
    const lightPinkCircleY = redCircleY + padding;
    const yellowCircleY = lightPinkCircleY + padding;
    const greenCircleY = yellowCircleY + padding;

    svg
      .append("g")
      .attr("transform", "translate(-160,90)")
      .selectAll("path")
      .data(
        topojson.feature(
          georgiaCoordinates,
          georgiaCoordinates.objects[
            "DuBoisChallenge - Georgia Counties w 1870 & 1880 data"
          ]
        ).features
      )
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", (d) => {
        const populationCategory = d.properties["data1870 ("];
        return categoryColors[populationCategory] || "gray";
      })
      .attr("stroke", "black")
      .append("title")
      .text((d) => {
        return `County: ${d.properties.NHGISNAM}`;
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text("NEGRO POPULATION OF GEORGIA BY COUNTIES.");

    svg
      .append("text")
      .attr("x", 125)
      .attr("y", 80)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .text("1870");

    svg
      .append("g")
      .attr("transform", "translate(110,440)")
      .selectAll("path")
      .data(
        topojson.feature(
          georgiaCoordinates,
          georgiaCoordinates.objects[
            "DuBoisChallenge - Georgia Counties w 1870 & 1880 data"
          ]
        ).features
      )
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", (d) => {
        const populationCategory = d.properties["data1880_P"];
        return categoryColors[populationCategory] || "gray";
      })
      .attr("stroke", "black")
      .append("title")
      .text((d) => {
        return `County: ${d.properties.NHGISNAM}`;
      });

    svg
      .append("text")
      .attr("x", 395)
      .attr("y", 430)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .text("1880");

    svg
      .append("circle")
      .attr("cx", 320)
      .attr("cy", blueCircleY)
      .attr("r", circleRadius)
      .attr("fill", "blue");

    svg
      .append("circle")
      .attr("cx", 320)
      .attr("cy", brownCircleY)
      .attr("r", circleRadius)
      .attr("fill", "brown");

    svg
      .append("circle")
      .attr("cx", 320)
      .attr("cy", tanCircleY)
      .attr("r", circleRadius)
      .attr("fill", "tan");

    svg
      .append("circle")
      .attr("cx", 80)
      .attr("cy", redCircleY)
      .attr("r", circleRadius)
      .attr("fill", "red");

    svg
      .append("circle")
      .attr("cx", 80)
      .attr("cy", lightPinkCircleY)
      .attr("r", circleRadius)
      .attr("fill", "lightpink");

    svg
      .append("circle")
      .attr("cx", 80)
      .attr("cy", yellowCircleY)
      .attr("r", circleRadius)
      .attr("fill", "yellow");

    svg
      .append("circle")
      .attr("cx", 80)
      .attr("cy", greenCircleY)
      .attr("r", circleRadius)
      .attr("fill", "green");

    const blueTextY = blueCircleY + 1;

    svg
      .append("text")
      .attr("x", 350)
      .attr("y", blueTextY)
      .attr("font-size", "16px")
      .text("BETWEEN 20,000 AND 30,000")
      .attr("alignment-baseline", "middle");

    const brownTextY = brownCircleY + 1;

    svg
      .append("text")
      .attr("x", 350)
      .attr("y", brownTextY)
      .attr("font-size", "16px")
      .text("15,000 TO 20,000")
      .attr("alignment-baseline", "middle");

    const tanTextY = tanCircleY + 1;

    svg
      .append("text")
      .attr("x", 350)
      .attr("y", tanTextY)
      .attr("font-size", "16px")
      .text("10,000 TO 15,000")
      .attr("alignment-baseline", "middle");

    const redTextY = redCircleY + 1;

    svg
      .append("text")
      .attr("x", 110)
      .attr("y", redTextY)
      .attr("font-size", "16px")
      .text("5,000 TO 10,000")
      .attr("alignment-baseline", "middle");

    const lightPinkTextY = lightPinkCircleY + 1;

    svg
      .append("text")
      .attr("x", 110)
      .attr("y", lightPinkTextY)
      .attr("font-size", "16px")
      .text("2,500 TO 5,000")
      .attr("alignment-baseline", "middle");

    const yellowTextY = yellowCircleY + 1;

    svg
      .append("text")
      .attr("x", 110)
      .attr("y", yellowTextY)
      .attr("font-size", "16px")
      .text("1,000 TO 2,500")
      .attr("alignment-baseline", "middle");

    const greenTextY = greenCircleY + 1;

    svg
      .append("text")
      .attr("x", 110)
      .attr("y", greenTextY)
      .attr("font-size", "16px")
      .text("UNDER 1,000")
      .attr("alignment-baseline", "middle");

    svg
      .append("text")
      .attr("x", 60)
      .attr("y", height - 80)
      .attr("font-size", "16px")
      .text("Created by Isin Kosemen")
      .attr("alignment-baseline", "middle");

    svg
      .append("text")
      .attr("x", 50)
      .attr("y", height - 50)
      .attr("font-size", "16px")
      .text("#DuboisChallenge2024")
      .attr("alignment-baseline", "middle");

    // Clean up function
    return () => {
      svg.selectAll("*").remove();
    };
  }, []); // Empty dependency array to run the effect only once

  return <div id="week1-chart"></div>;
};

export default Week1;
