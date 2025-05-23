import React, { useState, useEffect } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionByProvinceDropdown = ({ provinces = [], onSelectionChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchRegions = () => {
      const allRegions = getAllRegionsInfo();
      const filteredRegions = allRegions.filter((region) =>
        provinces.length === 0 || provinces.includes(region.province)
      );
      setRegions(filteredRegions);
    };
    fetchRegions();
  }, [provinces]);

  const handleDropdownChange = async (e) => {
    const regionName = e.target.value;
    setSelectedRegion(regionName);

    if (regionName) {
      const districts = await getFullDistrictsByRegion(regionName);
      const updated = {
        [regionName]: {
          name: regionName,
          districts: districts,
        },
      };
      onSelectionChange && onSelectionChange(updated);
    } else {
      onSelectionChange && onSelectionChange({});
    }
  };

  return regions.length > 0 ? (
    <div style={dropdownStyle.wrapper}>
      <div style={dropdownStyle.label}>Région</div>
      <select value={selectedRegion} onChange={handleDropdownChange} style={dropdownStyle.select}>
        <option value="">-- Sélectionnez une région --</option>
        {regions.map((region) => (
          <option key={region.region} value={region.region}>
            {region.region}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <p>Aucune région disponible pour cette/ces province(s).</p>
  );
};

const dropdownStyle = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
    width: "fit-content",
    backgroundColor: "#fff",
    marginBottom: "1rem",
  },
  label: {
    backgroundColor: "#f3f4f6",
    padding: "8px 12px",
    color: "#374151",
    fontWeight: "500",
    borderRight: "1px solid #e5e7eb",
  },
  select: {
    padding: "8px 12px",
    border: "none",
    outline: "none",
    fontWeight: "500",
    color: "#374151",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default RegionByProvinceDropdown;
