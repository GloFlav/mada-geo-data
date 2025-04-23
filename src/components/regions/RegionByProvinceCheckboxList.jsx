/** @format */

import React, { useState, useEffect } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionByProvinceCheckboxList = ({ provinces = [], onSelectionChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState({});

  useEffect(() => {
    const fetchRegions = async () => {
      const allRegions = getAllRegionsInfo();

      // On filtre ici selon provinces fournies
      const filteredRegions = allRegions.filter(region => 
        provinces.length === 0 || provinces.includes(region.province)
      );

      setRegions(filteredRegions);
    };

    fetchRegions();
  }, [provinces]); // IMPORTANT : dépendance à provinces

  const handleCheckboxChange = async (regionName, isChecked) => {
    if (isChecked) {
      const districts = await getFullDistrictsByRegion(regionName);

      setSelectedRegions((prev) => {
        const updated = {
          ...prev,
          [regionName]: {
            name: regionName,
            districts: districts,
          },
        };
        if (onSelectionChange) onSelectionChange(updated);
        return updated;
      });
    } else {
      setSelectedRegions((prev) => {
        const updated = { ...prev };
        delete updated[regionName];
        if (onSelectionChange) onSelectionChange(updated);
        return updated;
      });
    }
  };

  return (
    <div>
      {regions.length > 0 ? (
        regions.map((region) => (
          <div key={region.region}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(region.region, e.target.checked)}
                checked={!!selectedRegions[region.region]}
              />
              {region.region}
            </label>
          </div>
        ))
      ) : (
        <p>Aucune région disponible pour cette/ces province(s).</p>
      )}

      {/* affichage interne pour debug uniquement */}
      {/* {Object.keys(selectedRegions).length > 0 && (
        <div>
          <h4>Selection interne :</h4>
          <pre>{JSON.stringify(selectedRegions, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default RegionByProvinceCheckboxList;
