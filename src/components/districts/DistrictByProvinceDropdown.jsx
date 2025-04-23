import React, { useEffect, useState } from "react";
import { getFullDistrictsByProvince } from "../../utils/geoUtils";

const DistrictByProvinceDropdown = ({ provinces = [], onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    let allDistricts = [];
    provinces.forEach((province) => {
      const dists = getFullDistrictsByProvince(province);
      allDistricts = [...allDistricts, ...dists];
    });
    setDistricts(allDistricts);
  }, [provinces]);

  const handleChange = (e) => {
    const selectedName = e.target.value;
    const selected = districts.find((d) => d.district === selectedName);
    setSelectedDistrict(selected || null);

    if (onSelectionChange) onSelectionChange(selected || null);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
        Choisissez un district :
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
          width: "fit-content",
        }}
      >
        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "8px 12px",
            color: "#374151",
            fontWeight: "500",
            borderRight: "1px solid #e5e7eb",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {selectedDistrict?.zip_code || "ZIP"}
        </div>

        <select
          value={selectedDistrict?.district || ""}
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
          <option value="">-- Sélectionner --</option>
          {districts.map((district) => (
            <option key={district.district} value={district.district}>
              {district.district} ({district.region})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DistrictByProvinceDropdown;
