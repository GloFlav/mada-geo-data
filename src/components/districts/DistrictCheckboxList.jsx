import React, { useState, useEffect } from "react";
import { getAllDistrictsInfo } from "../../utils/geoUtils";

const DistrictCheckboxList = ({ onSelectionChange }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState({});

  useEffect(() => {
    const fetchDistricts = async () => {
      const dists = getAllDistrictsInfo();
      setDistricts(dists);
    };
    fetchDistricts();
  }, []);

  // Cette fonction est appelée lorsque l'état d'une case à cocher change
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

      // Passer l'objet mis à jour au parent (composant App)
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
              {district.district}
            </label>
          </div>
        ))
      ) : (
        <p>Aucun district disponible.</p>
      )}
    </div>
  );
};

export default DistrictCheckboxList;
