import React, { useEffect, useState } from "react";
import { getFullDistrictsByProvince } from "../../utils/geoUtils";

const DistrictByProvinceRadioGroup = ({ provinces = [], onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let all = [];
    provinces.forEach((province) => {
      const dists = getFullDistrictsByProvince(province);
      all = [...all, ...dists];
    });
    setDistricts(all);
  }, [provinces]);

  const handleChange = (districtName) => {
    setSelected(districtName);
    const district = districts.find(d => d.district === districtName);
    if (onSelectionChange) onSelectionChange(district);
  };

  return (
    <div>
      {districts.map((district) => (
        <label key={district.district} style={{ display: "block" }}>
          <input
            type="radio"
            name="district"
            value={district.district}
            checked={selected === district.district}
            onChange={() => handleChange(district.district)}
          />
          {district.district} ({district.region})
        </label>
      ))}
    </div>
  );
};

export default DistrictByProvinceRadioGroup;
