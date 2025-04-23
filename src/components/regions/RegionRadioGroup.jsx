/** @format */

import React, { useState, useEffect } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionRadioGroup = ({ onSelectionChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const regs = getAllRegionsInfo();
      setRegions(regs);
    };
    fetchRegions();
  }, []);

  const handleRadioChange = async (regionName) => {
    setSelectedRegion(regionName);

    if (regionName) {
      const districts = await getFullDistrictsByRegion(regionName);
      const updated = {
        [regionName]: {
          name: regionName,
          districts: districts,
        },
      };
      if (onSelectionChange) onSelectionChange(updated);
    } else {
      if (onSelectionChange) onSelectionChange({});
    }
  };

  return (
    <div>
      {regions.length > 0 ? (
        <div>
          {regions.map((region) => (
            <div key={region.region_id}>
              <label>
                <input
                  type="radio"
                  name="region"
                  value={region.region}
                  checked={selectedRegion === region.region}
                  onChange={() => handleRadioChange(region.region)}
                />
                {region.region}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune région disponible.</p>
      )}
    </div>
  );
};

export default RegionRadioGroup;
