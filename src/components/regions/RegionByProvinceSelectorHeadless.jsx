/** @format */

import React, { useState, useEffect } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const RegionByProvinceSelectorHeadless = ({ provinces = [], onRegionSelected, renderRegions, renderDistricts }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const allRegions = getAllRegionsInfo();

      // Filtrer les régions selon les provinces fournies
      const filteredRegions = allRegions.filter(region => 
        provinces.length === 0 || provinces.includes(region.province)
      );

      setRegions(filteredRegions);
    };

    fetchRegions();
  }, [provinces]); // Réagit au changement des provinces

  const handleRegionSelect = async (regionName) => {
    setSelectedRegion(regionName);
    const fetchedDistricts = await getFullDistrictsByRegion(regionName);
    setDistricts(fetchedDistricts);

    if (onRegionSelected) {
      onRegionSelected(regionName, fetchedDistricts);
    }
  };

  return (
    <div>
      {/* Render personnalisé pour les régions */}
      {renderRegions && renderRegions(regions, handleRegionSelect)}

      {/* Render personnalisé pour les districts */}
      {selectedRegion && renderDistricts && renderDistricts(selectedRegion, districts)}
    </div>
  );
};

export default RegionByProvinceSelectorHeadless;
