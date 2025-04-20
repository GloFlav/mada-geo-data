import React from "react";
import { getProvinces, getRegionsByProvince } from "../../utils/geoUtils";

const ProvinceCheckboxList = ({
  selectedProvinces,
  onChange,
  renderLabel = (province) => province.name,
}) => {
  // Génère un tableau d'objets { name }
  const provinces = getProvinces().map((name) => ({ name }));

  const toggleProvince = (provinceObj) => {
    const exists = selectedProvinces.some(p => p.name === provinceObj.name);
    const updated = exists
      ? selectedProvinces.filter(p => p.name !== provinceObj.name)
      : [...selectedProvinces, provinceObj];
    onChange(updated);
  };

  return (
    <div>
      <p>Choisir plusieurs provinces :</p>
      {provinces.map((province) => (
        <label key={province.name} style={{ display: "block", margin: "4px 0" }}>
          <input
            type="checkbox"
            checked={selectedProvinces.some(p => p.name === province.name)}
            onChange={() => toggleProvince(province)}
          />
          {renderLabel(province)}
          {selectedProvinces.some(p => p.name === province.name) && (
            <div>
              {getRegionsByProvince(province.name).map((region) => (
                <p key={region.region_id}>
                  {province.name} – Région ID : {region.region_id}
                </p>
              ))}
            </div>
          )}
        </label>
      ))}
    </div>
  );
};

export default ProvinceCheckboxList;
