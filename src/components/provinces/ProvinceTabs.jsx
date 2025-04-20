import React from "react";
import { getProvinces, getRegionsByProvince } from "../../utils/geoUtils";

const ProvinceTabs = ({
  selectedProvince,     // objet { name } ou null
  onChange,             // reçoit un objet { name }
  renderTab = (prov) => prov.name,
}) => {
  const provinces = getProvinces().map((name) => ({ name }));

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {provinces.map((prov) => (
          <button
            key={prov.name}
            onClick={() => onChange(prov)}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              backgroundColor:
                selectedProvince?.name === prov.name ? "#ddd" : "#fff",
            }}
          >
            {renderTab(prov)}
          </button>
        ))}
      </div>

      {selectedProvince && (
        <div>
          <h4>Province sélectionnée : {selectedProvince.name}</h4>
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

export default ProvinceTabs;
