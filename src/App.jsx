import React, { useState } from "react";
import ProvinceCheckboxList from "./components/provinces/ProvinceCheckboxList";
import ProvinceDropdown from "./components/provinces/ProvinceDropdown";
import ProvinceRadioGroup from "./components/provinces/ProvinceRadioGroup";
import ProvinceSelectorHeadless from "./components/provinces/ProvinceSelectorHeadless";
import RegionCheckboxList from "./components/regions/RegionCheckboxList";
import RegionDropdown from "./components/regions/RegionDropdown";
import RegionRadioGroup from "./components/regions/RegionRadioGroup";
import RegionSelectorHeadless from "./components/regions/RegionSelectorHeadless";
import RegionByProvinceCheckboxList from "./components/regions/RegionByProvinceCheckboxList";
import RegionByProvinceDropdown from "./components/regions/RegionByProvinceDropdown";
import RegionByProvinceRadioGroup from "./components/regions/RegionByProvinceRadioGroup";
import RegionByProvinceSelectorHeadless from "./components/regions/RegionByProvinceSelectorHeadless";
import DistrictSelectorHeadless from "./components/districts/DistrictSelectorHeadless";
import DistrictCheckboxList from "./components/districts/DistrictCheckboxList";
import DistrictDropdown from "./components/districts/DistrictDropdown";
import DistrictRadioGroup from "./components/districts/DistrictRadioGroup";
import DistrictByRegionCheckboxList from "./components/districts/DistrictByRegionCheckboxList";
import DistrictByProvinceCheckboxList from "./components/districts/DistrictByProvinceCheckboxList";


function App() {
  const [selectedProvinces, setSelectedProvinces] = useState({});
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regionsAndDistricts, setRegionsAndDistricts] = useState([]);

  const [selectedProvinceRadio, setSelectedProvinceRadio] = useState(null);
  const [regionsAndDistrictsRadio, setRegionsAndDistrictsRadio] = useState([]);

  const [selectedHeadlessProvince, setSelectedHeadlessProvince] = useState(null);
  const [headlessRegionsAndDistricts, setHeadlessRegionsAndDistricts] = useState([]);

  const [selectedRegions, setSelectedRegions] = useState({});
  const [selectedRegionDropdown, setSelectedRegionDropdown] = useState({});
  const [selectedRegionRadio, setSelectedRegionRadio] = useState({});
  const [selectedHeadlessRegion, setSelectedHeadlessRegion] = useState(null);
  const [headlessDistricts, setHeadlessDistricts] = useState([]);

  const [selectedDistrictsCheckbox, setSelectedDistrictsCheckbox] = useState({});
  const [selectedDistrictDropdown, setSelectedDistrictDropdown] = useState(null);
  const [selectedDistrictRadio, setSelectedDistrictRadio] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const isSelectionEmpty = Object.keys(selectedProvinces).length === 0;

  
  const [selectedRegionsCheckbox, setSelectedRegionsCheckbox] = useState({});
  const [selectedRegionsDropdown, setSelectedRegionsDropdown] = useState({});
  const [selectedRegionsRadio, setSelectedRegionsRadio] = useState({});

  const [districtsByRegionCheckbox, setDistrictsByRegionCheckbox] = useState({});
  const [districtsByProvinceCheckbox, setDistrictsByProvinceCheckbox] = useState({});
  const [districtDropdown, setDistrictDropdown] = useState(null);
  const [districtRadio, setDistrictRadio] = useState(null);
  const [districtHeadless, setDistrictHeadless] = useState(null);
  const handleSelectionChange = (updatedSelection) => {
    setSelectedProvinces(updatedSelection);
  };

  const handleDropdownSelectionChange = (provinceName, regionsWithDistricts) => {
    setSelectedProvince(provinceName);
    setRegionsAndDistricts(regionsWithDistricts);
  };

  const handleRadioGroupSelectionChange = (provinceName, regionsWithDistricts) => {
    setSelectedProvinceRadio(provinceName);
    setRegionsAndDistrictsRadio(regionsWithDistricts);
  };

  const handleHeadlessSelectionChange = (provinceName, regionsWithDistricts) => {
    setSelectedHeadlessProvince(provinceName);
    setHeadlessRegionsAndDistricts(regionsWithDistricts);
  };

  const handleRegionSelectionChange = (updatedSelection) => {
    setSelectedRegions(updatedSelection);
  };

  const handleRegionDropdownChange = (updatedSelection) => {
    setSelectedRegionDropdown(updatedSelection);
  };

  const handleRegionRadioSelectionChange = (updatedSelection) => {
    setSelectedRegionRadio(updatedSelection);
  };

  const handleHeadlessRegionSelectionChange = (regionName, districts) => {
    setSelectedHeadlessRegion(regionName);
    setHeadlessDistricts(districts);
  };
  const handleDistrictSelectionChange = (updatedSelection) => {
    const selectedDistricts = Object.keys(updatedSelection).map(districtKey => {
      const district = updatedSelection[districtKey];
      const provinceName = selectedProvince;  // On récupère la province sélectionnée
      const regionName = regionsAndDistricts.find(region => region.name === provinceName)?.regions.find(region => region.districts.includes(district));
      
      if(regionName) {
        return {
          province: provinceName,
          region: regionName.region,
          district: district.district,
          zip_code: district.zip_code
        };
      }
      
      return null;  // Si aucune région correspondante n'est trouvée
    }).filter(item => item !== null);  // Enlever les éléments null
  
    setSelectedDistrictsCheckbox(selectedDistricts);
  };
  
  

  const handleDistrictDropdownChange = (updatedSelection) => {
    setSelectedDistrictDropdown(updatedSelection);
  };

  const handleDistrictRadioSelectionChange = (updatedSelection) => {
    setSelectedDistrictRadio(updatedSelection);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sélection géographique - Mada Geo Data</h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Colonne Province */}
        <div style={{ flex: 1, borderRight: "1px solid #ccc", paddingRight: "1rem" }}>
          <h2>Provinces</h2>

          <div>
            <h3>Checkboxes</h3>
            <ProvinceCheckboxList onSelectionChange={handleSelectionChange} />
          </div>

          <div>
            <h3>Dropdown</h3>
            <ProvinceDropdown onSelectionChange={handleDropdownSelectionChange} />
          </div>

          <div>
            <h3>Radio Buttons</h3>
            <ProvinceRadioGroup
              onSelectionChange={handleRadioGroupSelectionChange}
              renderRegionsAndDistricts={(provinceName, regionsAndDistricts) => (
                <pre>{JSON.stringify({ provinceName, regionsAndDistricts }, null, 2)}</pre>
              )}
            />
          </div>

          <div>
            <h3>Headless Mode</h3>
            <ProvinceSelectorHeadless
              onProvinceSelected={handleHeadlessSelectionChange}
              renderProvinces={(provinces, handleSelect) => (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {provinces.map((prov) => (
                    <button key={prov.name} onClick={() => handleSelect(prov.name)}>
                      {prov.name}
                    </button>
                  ))}
                </div>
              )}
              renderRegionsAndDistricts={(provinceName, regionsAndDistricts) => (
                <pre>{JSON.stringify({ provinceName, regionsAndDistricts }, null, 2)}</pre>
              )}
            />
          </div>

          {/* Affichage de la sélection province */}
          <div style={{ marginTop: "1rem" }}>
            <h4>Province sélectionnée</h4>
            {!isSelectionEmpty ? (
              <pre>{JSON.stringify(selectedProvinces, null, 2)}</pre>
            ) : (
              <p>Aucune province sélectionnée</p>
            )}
          </div>

          {selectedProvince && (
            <div>
              <h4>Dropdown Selection</h4>
              <pre>{JSON.stringify({ province: selectedProvince, regionsAndDistricts }, null, 2)}</pre>
            </div>
          )}

          {selectedProvinceRadio && (
            <div>
              <h4>Radio Selection</h4>
              <pre>{JSON.stringify({ province: selectedProvinceRadio, regionsAndDistrictsRadio }, null, 2)}</pre>
            </div>
          )}

          {selectedHeadlessProvince && (
            <div>
              <h4>Headless Selection</h4>
              <pre>{JSON.stringify({ province: selectedHeadlessProvince, headlessRegionsAndDistricts }, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Colonne Region */}
        <div style={{ flex: 1, borderRight: "1px solid #ccc", paddingRight: "1rem", paddingLeft: "1rem" }}>
          <h2>Régions</h2>

          <div>
            <h3>Checkboxes</h3>
            <RegionCheckboxList onSelectionChange={handleRegionSelectionChange} />
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Dropdown</h3>
            <RegionDropdown onSelectionChange={handleRegionDropdownChange} />
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Radio Buttons</h3>
            <RegionRadioGroup onSelectionChange={handleRegionRadioSelectionChange} />
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h3>Headless Mode</h3>
            <RegionSelectorHeadless
              onRegionSelected={handleHeadlessRegionSelectionChange}
              renderRegions={(regions, handleSelect) => (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {regions.map((region) => (
                    <button key={region.region} onClick={() => handleSelect(region.region)}>
                      {region.region}
                    </button>
                  ))}
                </div>
              )}
              renderDistricts={(regionName, districts) => (
                <pre>{JSON.stringify({ regionName, districts }, null, 2)}</pre>
              )}
            />
          </div>
              
          <div className="App" style={{ padding: 20 }}>
            <h2>Test : RegionByProvinceCheckboxList</h2>
            <RegionByProvinceCheckboxList
              provinces={["Antananarivo", "Fianarantsoa"]}
              onSelectionChange={setSelectedRegionsCheckbox}
            />
            <pre>{JSON.stringify(selectedRegionsCheckbox, null, 2)}</pre>

            <hr />

            <h2>Test : RegionByProvinceDropdown</h2>
            <RegionByProvinceDropdown
              provinces={["Antananarivo"]}
              onSelectionChange={setSelectedRegionsDropdown}
            />
            <pre>{JSON.stringify(selectedRegionsDropdown, null, 2)}</pre>

            <hr />

            <h2>Test : RegionByProvinceRadioGroup</h2>
            <RegionByProvinceRadioGroup
              provinces={["Fianarantsoa"]}
              onSelectionChange={setSelectedRegionsRadio}
            />
            <pre>{JSON.stringify(selectedRegionsRadio, null, 2)}</pre>

            <hr />

            <h2>Test : RegionByProvinceSelectorHeadless</h2>
            <RegionByProvinceSelectorHeadless
              provinces={["Antananarivo", "Toliara"]}
              onRegionSelected={(region, districts) => {
                setSelectedHeadlessRegion(region);
                setHeadlessDistricts(districts);
              }}
              renderRegions={(regions, onSelect) => (
                <div>
                  {regions.map((r) => (
                    <button
                      key={r.region}
                      onClick={() => onSelect(r.region)}
                      style={{
                        margin: "5px",
                        padding: "5px 10px",
                        backgroundColor: "#ddd",
                        border: "1px solid #aaa",
                        cursor: "pointer",
                      }}
                    >
                      {r.region}
                    </button>
                  ))}
                </div>
              )}
              renderDistricts={(regionName, districts) => (
                <div>
                  <h4>Districts de {regionName} :</h4>
                  <ul>
                    {districts.map((d) => (
                      <li key={d.district}>
                        {d.district} ({d.zip_code})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />

            <pre>
              {JSON.stringify(
                {
                  region: selectedHeadlessRegion,
                  districts: headlessDistricts,
                },
                null,
                2
              )}
            </pre>
          </div>
          {/* Affichage de la sélection région */}
          <div style={{ marginTop: "1rem" }}>
            {Object.keys(selectedRegions).length > 0 && (
              <>
                <h4>Checkbox Selection</h4>
                <pre>{JSON.stringify(selectedRegions, null, 2)}</pre>
              </>
            )}
            {Object.keys(selectedRegionDropdown).length > 0 && (
              <>
                <h4>Dropdown Selection</h4>
                <pre>{JSON.stringify(selectedRegionDropdown, null, 2)}</pre>
              </>
            )}
            {Object.keys(selectedRegionRadio).length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h4>Radio Selection :</h4>
                <pre>{JSON.stringify(selectedRegionRadio, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Colonne District */}
        <div style={{ flex: 1, paddingLeft: "1rem" }}>
          <h2>Districts</h2>

          <div>
            <div style={{ marginTop: "3rem" }}>
              <h3>Checkboxes</h3>
              <DistrictCheckboxList onSelectionChange={(selected) => setSelectedDistrictsCheckbox(selected)} />

              <h3>Dropdown</h3>
              <DistrictDropdown onSelectionChange={(selected) => setSelectedDistrictDropdown(selected)} />

              <h3>Radio Buttons</h3>
              <DistrictRadioGroup onSelectionChange={(selected) => setSelectedDistrictRadio(selected)} />

              <h3>Headless Mode</h3>
              <DistrictSelectorHeadless
                onDistrictSelected={(district) => setSelectedDistrict(district)} // ✅ mettre à jour l'état
                renderDistricts={(districts, handleSelect) => (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {districts.map((district) => (
                      <button
                        key={district.district_id}
                        onClick={() => handleSelect(district)}
                        style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px" }}
                      >
                        {district.district}
                      </button>
                    ))}
                  </div>
                )}
              />

<div className="App" style={{ padding: 20 }}>
      <h1>Test des nouveaux composants Région & District</h1>

      <h2>1. RegionByProvinceCheckboxList</h2>
      <RegionByProvinceCheckboxList
        provinces={["Antananarivo", "Fianarantsoa"]}
        onSelectionChange={setSelectedRegionsCheckbox}
      />
      <pre>{JSON.stringify(selectedRegionsCheckbox, null, 2)}</pre>

      <hr />

      <h2>2. RegionByProvinceDropdown</h2>
      <RegionByProvinceDropdown
        provinces={["Antananarivo"]}
        onSelectionChange={setSelectedRegionsDropdown}
      />
      <pre>{JSON.stringify(selectedRegionsDropdown, null, 2)}</pre>

      <hr />

      <h2>3. RegionByProvinceRadioGroup</h2>
      <RegionByProvinceRadioGroup
        provinces={["Fianarantsoa"]}
        onSelectionChange={setSelectedRegionsRadio}
      />
      <pre>{JSON.stringify(selectedRegionsRadio, null, 2)}</pre>

      <hr />

      <h2>4. RegionByProvinceSelectorHeadless</h2>
      <RegionByProvinceSelectorHeadless
        provinces={["Antananarivo", "Toliara"]}
        onRegionSelected={(region, districts) => {
          setSelectedHeadlessRegion(region);
          setHeadlessDistricts(districts);
        }}
        renderRegions={(regions, onSelect) => (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {regions.map((region) => (
              <button key={region.region} onClick={() => onSelect(region.region)}>
                {region.region}
              </button>
            ))}
          </div>
        )}
        renderDistricts={(region, districts) => (
          <pre>{JSON.stringify({ region, districts }, null, 2)}</pre>
        )}
      />
      <hr />

      <h2>5. DistrictByRegionCheckboxList</h2>
      <DistrictByRegionCheckboxList
        regions={["Analamanga", "Vakinankaratra"]}
        onSelectionChange={setDistrictsByRegionCheckbox}
      />
      <pre>{JSON.stringify(districtsByRegionCheckbox, null, 2)}</pre>

      <hr />

      <h2>6. DistrictByProvinceCheckboxList</h2>
      <DistrictByProvinceCheckboxList
        provinces={["Antananarivo"]}
        onSelectionChange={setDistrictsByProvinceCheckbox}
      />
      <pre>{JSON.stringify(districtsByProvinceCheckbox, null, 2)}</pre>

      <hr />

      <h2>DistrictDropdown</h2>
      <DistrictDropdown
        onSelectionChange={setDistrictDropdown}
      />
      <pre>{JSON.stringify(districtDropdown, null, 2)}</pre>

      <hr />

      <h2>DistrictRadioGroup</h2>
      <DistrictRadioGroup
        onSelectionChange={setDistrictRadio}
      />
      <pre>{JSON.stringify(districtRadio, null, 2)}</pre>

      <hr />

      <h2>DistrictSelectorHeadless</h2>
      <DistrictSelectorHeadless
        onDistrictSelected={setDistrictHeadless}
        renderDistricts={(districts, handleSelect) => (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {districts.map((d) => (
              <button key={d.district} onClick={() => handleSelect(d)}>
                {d.district}
              </button>
            ))}
          </div>
        )}
      />
      <pre>{JSON.stringify(districtHeadless, null, 2)}</pre>
    </div>
              {selectedDistrictsCheckbox.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>Districts sélectionnés :</h4>
                  <pre>{JSON.stringify(selectedDistrictsCheckbox, null, 2)}</pre>
                </div>
              )}


              {selectedDistrictDropdown && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>Dropdown Selection :</h4>
                  <pre>{JSON.stringify(selectedDistrictDropdown, null, 2)}</pre>
                </div>
              )}

              {selectedDistrictRadio && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>Radio Selection :</h4>
                  <pre>{JSON.stringify(selectedDistrictRadio, null, 2)}</pre>
                </div>
              )}

              {/* Affichage du district sélectionné */}
              {selectedDistrict && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>District sélectionné :</h4>
                  <pre>{JSON.stringify(selectedDistrict, null, 2)}</pre>
                </div>
              )}
            </div>
            <hr></hr>
            

          <DistrictByProvinceCheckboxList
            provinces={["Antananarivo", "Fianarantsoa"]}
            onSelectionChange={(selected) => console.log("Districts par province :", selected)}
          />

          <DistrictByRegionCheckboxList
            regions={["Analamanga", "Vakinankaratra"]}
            onSelectionChange={(selected) => console.log("Districts par région :", selected)}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
