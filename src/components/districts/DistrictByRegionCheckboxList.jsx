import React, { useEffect, useState } from "react";
import { getFullDistrictsByRegion } from "../../utils/geoUtils";

const DistrictByRegionCheckboxList = ({ regions = [], onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState({});

  useEffect(() => {
    let allDistricts = [];
    regions.forEach((region) => {
      const dists = getFullDistrictsByRegion(region);
      allDistricts = [...allDistricts, ...dists];
    });
    setDistricts(allDistricts);
  }, [regions]);

  const handleCheckboxChange = (districtName, isChecked) => {
    setSelectedDistricts((prev) => {
      const updated = { ...prev };
      const selectedDistrictInfo = districts.find(
        (district) => district.district === districtName
      );

      if (isChecked) {
        updated[districtName] = selectedDistrictInfo;
      } else {
        delete updated[districtName];
      }

      if (onSelectionChange) onSelectionChange(Object.values(updated));
      return updated;
    });
  };

  return (
    <div>
      {districts.length > 0 ? (
        districts.map((district) => (
          <div key={district.district}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(district.district, e.target.checked)}
                checked={!!selectedDistricts[district.district]}
              />
              {district.district} ({district.province})
            </label>
          </div>
        ))
      ) : (
        <p>Aucun district trouvé pour les régions sélectionnées.</p>
      )}
    </div>
  );
};

export default DistrictByRegionCheckboxList;
