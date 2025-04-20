import React, { useState, useEffect } from "react";
import { getProvinces } from "../../utils/geoUtils";

// ProvinceDataProvider fournit un tableau d’objets { name } au parent
const ProvinceDataProvider = ({ onDataAvailable }) => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    // Récupère toutes les clés puis on les transforme en objets { name }
    const allProvinces = getProvinces().map((name) => ({ name }));
    setProvinces(allProvinces);

    if (onDataAvailable) {
      onDataAvailable(allProvinces);
    }
  }, [onDataAvailable]);

  return null;
};

export default ProvinceDataProvider;
