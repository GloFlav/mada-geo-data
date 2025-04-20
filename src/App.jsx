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
    // 'data' est désormais un tableau d’objets { name }
    setProvinces(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌍 Sélection de province - Mada Geo Data</h1>
      <ProvinceDataProvider onDataAvailable={handleDataAvailable} />

      <hr />
      <h2>🔽 Dropdown</h2>
      <ProvinceDropdown
        selectedProvince={selectedProvince}               // <-- objet ou null
        onChange={setSelectedProvince}                   // reçoit { name }
        renderOption={(province) => `🌍 ${province.name}`}
      />

      <hr />
      <h2>📻 Radio</h2>
      <ProvinceRadioGroup
        selectedProvince={selectedProvince}               // <-- objet ou null
        onChange={setSelectedProvince}                   // reçoit { name }
        renderLabel={(province) => `✅ ${province.name}`}
      />

      <hr />
      <h2>✅ Multi-choix</h2>
      <ProvinceCheckboxList
        selectedProvinces={multiProvinces}
        onChange={setMultiProvinces}
        renderLabel={(province) => `📌 ${province.name}`}
      />
      <p>
        Provinces sélectionnées :{" "}
        {multiProvinces.map((p) => p.name).join(", ")}
      </p>

      <hr />
      <h2>📑 Tabs</h2>
      <ProvinceTabs
        selectedProvince={selectedProvince}
        onChange={setSelectedProvince}
        renderTab={(province) => `🗂️ ${province.name}`}
      />

      <hr />
      <h2>Provinces disponibles :</h2>
      <div>
        {provinces.length > 0 ? (
          provinces.map((prov) => (
            <button
              key={prov.name}
              onClick={() => setSelectedProvince(prov)}
              style={{ margin: "4px" }}
            >
              {prov.name}
            </button>
          ))
        ) : (
          <p>Aucune province disponible.</p>
        )}
      </div>

      {selectedProvince && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <h3>Province sélectionnée :</h3>
          <p>Nom : {selectedProvince.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
