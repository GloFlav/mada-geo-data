import React, { useEffect, useState } from "react";
import { getFullDistrictsByProvince } from "../../utils/geoUtils";

const DistrictByProvinceSelectorHeadless = ({
  provinces = [],
  children,
  onSelectionChange,
}) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    let all = [];
    provinces.forEach((province) => {
      const dists = getFullDistrictsByProvince(province);
      all = [...all, ...dists];
    });
    setDistricts(all);
  }, [provinces]);

  return children({ districts, onSelectionChange });
};

export default DistrictByProvinceSelectorHeadless;
