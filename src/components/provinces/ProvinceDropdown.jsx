import React from "react";
import { getProvinces, getRegionsByProvince } from "../../utils/geoUtils";

const ProvinceDropdown = ({
  selectedProvince,         // objet { name } ou null
  onChange,                 // reçoit un objet { name }
  renderOption = (prov) => prov.name,
}) => {
  const provinces = getProvinces().map((name) => ({ name }));

  return (
    <div>
      <label htmlFor="province-dropdown">Choisir une province :</label>
      <select
        id="province-dropdown"
        value={selectedProvince?.name || ""}
        onChange={(e) => {
          const prov = provinces.find((p) => p.name === e.target.value) || null;
          onChange(prov);
        }}
      >
        <option value="">-- Sélectionner --</option>
        {provinces.map((prov) => (
          <option key={prov.name} value={prov.name}>
            {renderOption(prov)}
          </option>
        ))}
      </select>

      {selectedProvince && (
        <div>
          {getRegionsByProvince(selectedProvince.name).map((region) => (
            <p key={region.region_id}>
              {selectedProvince.name} – Région ID : {region.region_id}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvinceDropdown;
