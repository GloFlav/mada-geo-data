import React, { useEffect, useState } from "react";
import { getFullDistrictsByRegion } from "../../utils/geoUtils";

const DistrictByRegionSelectorHeadless = ({
  regions = [],
  children,
  onSelectionChange,
}) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    let all = [];
    regions.forEach((region) => {
      const dists = getFullDistrictsByRegion(region);
      all = [...all, ...dists];
    });
    setDistricts(all);
  }, [regions]);

  return children({ districts, onSelectionChange });
};

export default DistrictByRegionSelectorHeadless;
