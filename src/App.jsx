import React, { useState } from "react";
import ProvinceDropdown from "./components/provinces/ProvinceDropdown";
import ProvinceRadioGroup from "./components/provinces/ProvinceRadioGroup";
import ProvinceCheckboxList from "./components/provinces/ProvinceCheckboxList";
import ProvinceTabs from "./components/provinces/ProvinceTabs";
import ProvinceDataProvider from "./components/provinces/ProvinceDataProvider";

function App() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [multiProvinces, setMultiProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const handleDataAvailable = (data) => {
    setProvinces(data); // Assurez-vous que `data` est un tableau d'objets province
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌍 Sélection de province - Mada Geo Data</h1>

      {/* ProvinceDataProvider donne accès aux données des provinces */}
      <ProvinceDataProvider onDataAvailable={handleDataAvailable} />

      <hr />
      <h2>🔽 Dropdown</h2>
      <ProvinceDropdown
        selectedProvince={selectedProvince ? selectedProvince.name : ""}
        onChange={(province) => setSelectedProvince(province)}
        renderOption={(province) => `🌍 ${province.name}`} // Affichage du nom de la province
      />

      <hr />
      <h2>📻 Radio</h2>
      <ProvinceRadioGroup
        selectedProvince={selectedProvince ? selectedProvince.name : ""}
        onChange={(province) => setSelectedProvince(province)}
        renderLabel={(province) => `✅ ${province.name}`} // Affichage du nom de la province
      />

      <hr />
      <h2>✅ Multi-choix</h2>
      <ProvinceCheckboxList
        selectedProvinces={multiProvinces}
        onChange={setMultiProvinces}
        renderLabel={(province) => `📌 ${province.name}`} // Affichage du nom de la province
      />
      <p>Provinces sélectionnées : {multiProvinces.map((province) => province.name).join(", ")}</p>

      <hr />
      <h2>📑 Tabs</h2>
      <ProvinceTabs
        selectedProvince={selectedProvince ? selectedProvince.name : ""}
        onChange={(province) => setSelectedProvince(province)}
        renderTab={(province) => `🗂️ ${province.name}`} // Affichage du nom de la province
      />

      <hr />
      <h2>Provinces disponibles :</h2>
      {/* Affichage des provinces récupérées */}
      <div>
        {provinces.length > 0 ? (
          provinces.map((province) => (
            <div key={province.name}>
              <button onClick={() => setSelectedProvince(province)}>
                {province.name}
              </button>
            </div>
          ))
        ) : (
          <p>Aucune province disponible.</p>
        )}
      </div>

      {selectedProvince && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <h3>Province sélectionnée :</h3>
          <p>Nom : {selectedProvince.name}</p>
          <p>Region ID : {selectedProvince.region_id}</p>
        </div>
      )}
    </div>
  );
}

export default App;
