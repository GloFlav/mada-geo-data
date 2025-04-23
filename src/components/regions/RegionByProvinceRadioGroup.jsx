/** @format */

import React, { useState, useEffect } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionByProvinceRadioGroup = ({ provinces = [], onSelectionChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      const allRegions = getAllRegionsInfo();

      // Filtrer les régions selon les provinces données
      const filteredRegions = allRegions.filter(region => 
        provinces.length === 0 || provinces.includes(region.province)
      );

      setRegions(filteredRegions);
    };

    fetchRegions();
  }, [provinces]); // Réagit aux changements dans provinces

  const handleRadioChange = async (regionName) => {
    setSelectedRegion(regionName);
    const districts = await getFullDistrictsByRegion(regionName);

    const updated = {
      [regionName]: {
        name: regionName,
        districts: districts,
      },
    };

    if (onSelectionChange) onSelectionChange(updated);
  };

  return (
    <div>
      {regions.length > 0 ? (
        regions.map((region) => (
          <div key={region.region}>
            <label>
              <input
                type="radio"
                name="region"
                value={region.region}
                onChange={() => handleRadioChange(region.region)}
                checked={selectedRegion === region.region}
              />
              {region.region}
            </label>
          </div>
        ))
      ) : (
        <p>Aucune région disponible pour cette/ces province(s).</p>
      )}
    </div>
  );
};

export default RegionByProvinceRadioGroup;
