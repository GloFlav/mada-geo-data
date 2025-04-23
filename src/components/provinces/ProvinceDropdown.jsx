import React, { useState, useEffect } from "react";
import { getAllProvincesInfo, getFullRegionsByProvince, getFullDistrictsByRegion } from "../../utils/geoUtils";

const ProvinceDropdown = ({ onSelectionChange, renderRegionsAndDistricts }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regionsAndDistricts, setRegionsAndDistricts] = useState([]);

  useEffect(() => {
    const fetchProvinces = () => {
      const provs = Object.entries(getAllProvincesInfo()).map(([provinceName, regionData]) => ({
        name: provinceName,
        regions: regionData,
      }));
      setProvinces(provs);
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const selectedProvinceName = event.target.value;
    setSelectedProvince(selectedProvinceName);

    const regions = await getFullRegionsByProvince(selectedProvinceName);
    const regionsWithDistricts = await Promise.all(
      regions.map(async (region) => ({
        ...region,
        districts: await getFullDistrictsByRegion(region.region),
      }))
    );

    setRegionsAndDistricts(regionsWithDistricts);
    onSelectionChange && onSelectionChange(selectedProvinceName, regionsWithDistricts);
  };

  return (
    <div style={dropdownStyle.wrapper}>
      <div style={dropdownStyle.label}>Province</div>
      <select value={selectedProvince || ""} onChange={handleProvinceChange} style={dropdownStyle.select}>
        <option value="">Choisissez une province</option>
        {provinces.map((province) => (
          <option key={province.name} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
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

export default ProvinceDropdown;
