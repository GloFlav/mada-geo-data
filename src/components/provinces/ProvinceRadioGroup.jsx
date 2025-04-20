import React from "react";
import { getProvinces, getRegionsByProvince } from "../../utils/geoUtils";

const ProvinceRadioGroup = ({
  selectedProvince,       // objet { name } ou null
  onChange,               // reçoit un objet { name }
  renderLabel = (prov) => prov.name,
}) => {
  const provinces = getProvinces().map((name) => ({ name }));

  return (
    <div>
      <p>Choisir une province :</p>
      {provinces.map((prov) => (
        <label key={prov.name} style={{ display: "block", margin: "4px 0" }}>
          <input
            type="radio"
            name="province"
            value={prov.name}
            checked={selectedProvince?.name === prov.name}
            onChange={() => onChange(prov)}
          />
          {renderLabel(prov)}
        </label>
      ))}

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

export default ProvinceRadioGroup;
