import React, { useState, useEffect } from "react";
import { getAllProvincesInfo, getFullRegionsByProvince, getFullDistrictsByRegion } from "../../utils/geoUtils";

const ProvinceRadioGroup = ({ onSelectionChange, renderRegionsAndDistricts }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regionsAndDistricts, setRegionsAndDistricts] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const provs = Object.entries(getAllProvincesInfo()).map(([provinceName, regionData]) => ({
        name: provinceName,
        regions: regionData,
      }));
      setProvinces(provs);
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const selectedProvinceName = event.target.value;
    setSelectedProvince(selectedProvinceName);

    const regions = await getFullRegionsByProvince(selectedProvinceName);
    const regionsWithDistricts = await Promise.all(
      regions.map(async (region) => ({
        ...region,
        districts: await getFullDistrictsByRegion(region.region),
      }))
    );

    setRegionsAndDistricts(regionsWithDistricts);
    onSelectionChange && onSelectionChange(selectedProvinceName, regionsWithDistricts);
  };

  return (
    <div>
      <h3>Sélectionner une province :</h3>
      {provinces.map((province) => (
        <div key={province.name}>
          <label>
            <input
              type="radio"
              name="province"
              value={province.name}
              onChange={handleProvinceChange}
              checked={selectedProvince === province.name}
            />
            {province.name}
          </label>
        </div>
      ))}

      {/* Appel de la fonction renderRegionsAndDistricts pour personnaliser l'affichage */}
      {selectedProvince && renderRegionsAndDistricts ? (
        renderRegionsAndDistricts(selectedProvince, regionsAndDistricts)
      ) : (
        <div>
          {regionsAndDistricts.length > 0 ? (
            regionsAndDistricts.map((region, index) => (
              <div key={index}>
                <pre>{JSON.stringify(region.districts, null, 2)}</pre>
              </div>
            ))
          ) : (
            <p>Aucun district trouvé pour cette province.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProvinceRadioGroup;
