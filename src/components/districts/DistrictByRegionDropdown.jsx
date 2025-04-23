import React, { useEffect, useState } from "react";
import { getFullDistrictsByRegion } from "../../utils/geoUtils";

const DistrictByRegionDropdown = ({ regions = [], onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    let allDistricts = [];
    regions.forEach((region) => {
      const dists = getFullDistrictsByRegion(region);
      allDistricts = [...allDistricts, ...dists];
    });
    setDistricts(allDistricts);
  }, [regions]);

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedDistrict(selected);
    const found = districts.find((d) => d.district === selected);
    if (onSelectionChange) onSelectionChange(found || null);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        width: "fit-content",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "8px 12px",
          color: "#374151",
          fontWeight: "500",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        District
      </div>
      <select
        value={selectedDistrict}
        onChange={handleChange}
        style={{
          padding: "8px 12px",
          border: "none",
          outline: "none",
          fontWeight: "500",
          color: "#374151",
          backgroundColor: "transparent",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        <option value="">-- Sélectionner un district --</option>
        {districts.map((district) => (
          <option key={district.district} value={district.district}>
            {district.district} ({district.province})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictByRegionDropdown;
