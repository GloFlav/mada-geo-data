/** @format */

import React, { useEffect, useState } from "react";
import { getAllRegionsInfo, getFullDistrictsByRegion } from "../../utils/geoUtils";

const DistrictSelectorHeadless = ({
  onDistrictSelected,
  renderDistricts,
}) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchAllDistricts = async () => {
      const regions = getAllRegionsInfo();

      let allDistricts = [];

      // On parcourt toutes les régions et on récupère tous les districts
      for (const region of regions) {
        const regionDistricts = await getFullDistrictsByRegion(region.region);
        allDistricts = [...allDistricts, ...regionDistricts];
      }

      setDistricts(allDistricts);
    };

    fetchAllDistricts();
  }, []);

  const handleDistrictSelect = (district) => {
    onDistrictSelected?.(district);
  };

  return (
    <>
      {/* L'utilisateur décide comment afficher les districts */}
      {renderDistricts && renderDistricts(districts, handleDistrictSelect)}
    </>
  );
};

export default DistrictSelectorHeadless;
