import React, { useState, useEffect } from "react";
import { getAllProvincesInfo, getFullRegionsByProvince, getFullDistrictsByRegion } from "../../utils/geoUtils";

const ProvinceCheckboxList = ({ onSelectionChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState({});

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

  const handleCheckboxChange = async (provinceName, isChecked) => {
    if (isChecked) {
      const regions = await getFullRegionsByProvince(provinceName);
      const regionsWithDistricts = await Promise.all(
        regions.map(async (region) => ({
          ...region,
          districts: await getFullDistrictsByRegion(region.region),
        }))
      );

      setSelectedProvinces((prev) => {
        const updated = {
          ...prev,
          [provinceName]: {
            name: provinceName,
            regions: regionsWithDistricts,
          },
        };
        onSelectionChange && onSelectionChange(updated);
        return updated;
      });
    } else {
      setSelectedProvinces((prev) => {
        const updated = { ...prev };
        delete updated[provinceName];
        onSelectionChange && onSelectionChange(updated);
        return updated;
      });
    }
  };

  return (
    <div>
      {provinces.length > 0 ? (
        provinces.map((province) => (
          <div key={province.name}>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(province.name, e.target.checked)
                }
                checked={!!selectedProvinces[province.name]}
              />
              {province.name}
            </label>
          </div>
        ))
      ) : (
        <p>Aucune province disponible.</p>
      )}
{/* 
      {Object.keys(selectedProvinces).length > 0 && (
        <div>
          <pre>{JSON.stringify(selectedProvinces, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default ProvinceCheckboxList;
