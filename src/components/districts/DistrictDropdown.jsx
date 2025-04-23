import React, { useState, useEffect } from "react";
import { getAllDistrictsInfo } from "../../utils/geoUtils";

const DistrictDropDown = ({ onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchDistricts = () => {
      const dists = getAllDistrictsInfo();
      setDistricts(dists);
    };
    fetchDistricts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);

    const selectedDistrictInfo = districts.find(
      (district) => district.district === value
    );

    if (onSelectionChange) onSelectionChange(selectedDistrictInfo);
  };

  const selectedZipCode =
    selectedDistrict &&
    districts.find((d) => d.district === selectedDistrict)?.zip_code;

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
        {selectedZipCode || "ZIP"}
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
            {district.district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictDropDown;
