"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const baseLayout = {
    columns: [1, 1, 1, 1], // Basisgrößen für Spalten
    rows: [1, 1, 1, 1], // Basisgrößen für Reihen
  };

  const tileTexts = [
    "Home",
    "About",
    "Services",
    "Contact",
    "Portfolio",
    "Blog",
    "Team",
    "Careers",
    "FAQ",
    "Support",
    "Terms",
    "Privacy",
    "Feedback",
    "News",
    "Gallery",
    "Events",
  ];

  const [gridTemplate, setGridTemplate] = useState({
    columns: baseLayout.columns.map((size) => `${size}fr`).join(" "), // Initiales Layout
    rows: baseLayout.rows.map((size) => `${size}fr`).join(" "), // Initiales Layout
  });

  const [fontSizes, setFontSizes] = useState(Array(16).fill("1rem")); // Initial font sizes for grid items
  const [fontWeights, setFontWeights] = useState(Array(16).fill("normal")); // Initial font weights
  const [colors, setColors] = useState(Array(16).fill("#606060")); // Initial colors

  const effectStrength = 0.2; // Strength of the resizing effect
  const exponentialFactor = 1.5; // Exponent for scaling

  const resetRef = useRef<any>(null); // Reference for reset timer

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    clearTimeout(resetRef.current); // Clear the timer on mouse move

    const mouseX = e.clientX; // Relative to viewport
    const mouseY = e.clientY; // Relative to viewport

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update background gradient based on mouse position
    const gradient = `radial-gradient(circle at ${mouseX}px ${mouseY}px, #202020 0, #000000 70%)`;
    document.body.style.background = gradient;

    // Calculate how much each column and row should grow or shrink based on mouse distance
    const colCenters = Array.from({ length: 4 }, (_, i) => (i + 0.5) * (width / 4));
    const rowCenters = Array.from({ length: 4 }, (_, i) => (i + 0.5) * (height / 4));

    const columns = colCenters.map((centerX, index) => {
      const distanceX = Math.abs(mouseX - centerX);
      const scale = Math.pow(1 - (effectStrength * distanceX) / (width / 2), exponentialFactor);
      return `${baseLayout.columns[index] * scale}fr`; // Relative to base size
    });

    const rows = rowCenters.map((centerY, index) => {
      const distanceY = Math.abs(mouseY - centerY);
      const scale = Math.pow(1 - (effectStrength * distanceY) / (height / 2), exponentialFactor);
      return `${baseLayout.rows[index] * scale}fr`; // Relative to base size
    });

    setGridTemplate({
      columns: columns.join(" "),
      rows: rows.join(" "),
    });

    // Calculate font sizes, weights, and colors based on the cell sizes
    const newFontSizes = Array.from({ length: 16 }, (_, index) => {
      const colIndex = index % 4; // Column index
      const rowIndex = Math.floor(index / 4); // Row index

      const colSize = parseFloat(columns[colIndex]) * (width / 4); // Width of the column in pixels
      const rowSize = parseFloat(rows[rowIndex]) * (height / 4); // Height of the row in pixels

      return `${Math.min(colSize, rowSize) * 0.1}px`; // Adjust the multiplier as needed
    });

    const newFontWeights = Array.from({ length: 16 }, (_, index) => {
      const colIndex = index % 4;
      const rowIndex = Math.floor(index / 4);
      const distanceX = Math.abs(mouseX - colCenters[colIndex]);
      const distanceY = Math.abs(mouseY - rowCenters[rowIndex]);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Scale the font weight based on distance
      const weightScale = Math.max(0, 1 - distance / (width / 2));

      // Map the scale from 0 to 1 to 100 to 900
      const fontWeight = Math.round(100 + weightScale * 800); // 800 is the range from 100 to 900
      return fontWeight; // Return the calculated font weight
    });

    const newColors = Array.from({ length: 16 }, (_, index) => {
      const colIndex = index % 4;
      const rowIndex = Math.floor(index / 4);
      const distanceX = Math.abs(mouseX - colCenters[colIndex]);
      const distanceY = Math.abs(mouseY - rowCenters[rowIndex]);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const colorScale = Math.max(0, 1 - distance / (width / 2)); // Scale for color brightness
      const colorValue = Math.floor(100 * colorScale); // Calculate color value (0 to 255)
      return `rgb(${colorValue}, ${colorValue}, ${colorValue})`; // Grayscale color
    });

    setFontSizes(newFontSizes);
    setFontWeights(newFontWeights);
    setColors(newColors);

    // Start the timer to reset the grid when the mouse stops moving
    resetRef.current = setTimeout(resetGrid, 1000); // 1 second delay
  };

  const resetGrid = () => {
    setGridTemplate({
      columns: baseLayout.columns.map((size) => `${size}fr`).join(" "),
      rows: baseLayout.rows.map((size) => `${size}fr`).join(" "),
    });

    setFontSizes(Array(16).fill("1rem")); // Reset font sizes to default
    setFontWeights(Array(16).fill("normal")); // Reset font weights to default
    setColors(Array(16).fill("#303030")); // Reset colors to default

    // Reset background gradient
    document.body.style.background = "#101010";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(resetRef.current); // Clear timer
    };
  }, []);

  return (
    <div
      className={styles.gridContainer}
      style={{
        gridTemplateColumns: gridTemplate.columns,
        gridTemplateRows: gridTemplate.rows,
        gap: "1px", // Adjust gap between items
      }}
    >
      {tileTexts.map((text, index) => (
        <div
          key={index}
          className={styles.gridItem}
          style={{ fontSize: fontSizes[index], fontWeight: fontWeights[index], color: colors[index] }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
