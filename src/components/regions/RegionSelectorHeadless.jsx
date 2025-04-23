/** @format */

import React, { useEffect, useState } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionSelectorHeadless = ({
  onRegionSelected,
  renderRegions,
  renderDistricts,
}) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchRegions = () => {
      const regs = getAllRegionsInfo();
      setRegions(regs);
    };
    fetchRegions();
  }, []);

  const handleRegionSelect = async (regionName) => {
    setSelectedRegion(regionName);

    const fetchedDistricts = await getFullDistrictsByRegion(regionName);
    setDistricts(fetchedDistricts);
    onRegionSelected?.(regionName, fetchedDistricts);
  };

  return (
    <>
      {/* L'utilisateur décide comment afficher la liste de régions */}
      {renderRegions && renderRegions(regions, handleRegionSelect)}

      {/* Et aussi comment afficher les districts */}
      {selectedRegion && renderDistricts?.(selectedRegion, districts)}
    </>
  );
};

export default RegionSelectorHeadless;
