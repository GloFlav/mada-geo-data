import React, { useEffect, useState } from "react";
import {
  getAllProvincesInfo,
  getFullRegionsByProvince,
  getFullDistrictsByRegion,
} from "../../utils/geoUtils";

const ProvinceSelectorHeadless = ({
  onProvinceSelected,
  renderProvinces,
  renderRegionsAndDistricts,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [regionsAndDistricts, setRegionsAndDistricts] = useState([]);

  useEffect(() => {
    const fetchProvinces = () => {
      const provs = Object.entries(getAllProvincesInfo()).map(([provinceName, regionData]) => ({
        name: provinceName,
        regions: regionData,
      }));
      setProvinces(provs);
    };
    fetchProvinces();
  }, []);

  const handleProvinceSelect = async (provinceName) => {
    setSelectedProvince(provinceName);

    const regions = await getFullRegionsByProvince(provinceName);
    const regionsWithDistricts = await Promise.all(
      regions.map(async (region) => ({
        ...region,
        districts: await getFullDistrictsByRegion(region.region),
      }))
    );

    setRegionsAndDistricts(regionsWithDistricts);
    onProvinceSelected?.(provinceName, regionsWithDistricts);
  };

  return (
    <>
      {/* L'utilisateur décide comment afficher la liste de provinces */}
      {renderProvinces && renderProvinces(provinces, handleProvinceSelect)}

      {/* Et aussi comment afficher les régions/districts */}
      {selectedProvince && renderRegionsAndDistricts?.(selectedProvince, regionsAndDistricts)}
    </>
  );
};

export default ProvinceSelectorHeadless;
