import React, { useState, useEffect } from "react";
import { getAllDistrictsInfo } from "../../utils/geoUtils";

const DistrictRadioGroup = ({ onSelectionChange }) => {
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

    // Trouver les informations complètes du district sélectionné
    const selectedDistrictInfo = districts.find(
      (district) => district.district === value
    );

    // Passer les informations complètes du district au parent via onSelectionChange
    if (onSelectionChange) onSelectionChange(selectedDistrictInfo);
  };

  return (
    <div>
      {districts.map((district) => (
        <div key={district.district}>
          <label>
            <input
              type="radio"
              name="district"
              value={district.district}
              onChange={handleChange}
              checked={selectedDistrict === district.district}
            />
            {district.district}
          </label>
        </div>
      ))}
    </div>
  );
};

export default DistrictRadioGroup;
