/** @format */

import data from "../data/madaGeoData.json";

// Récupérer toutes les provinces (avec leurs régions et districts)
export const getAllProvincesInfo = () => data;

// Récupérer toutes les régions (avec region_id et districts)
export const getAllRegionsInfo = () => {
  let regions = [];
  Object.entries(data).forEach(([provinceName, regionsData]) => {
    Object.entries(regionsData).forEach(([regionName, regionData]) => {
      regions.push({
        province: provinceName,
        region: regionName,
        region_id: regionData.region_id,
        districts: regionData.districts,
      });
    });
  });
  return regions;
};

// Récupérer tous les districts (avec province, région, district, zip_code)
export const getAllDistrictsInfo = () => {
  let districts = [];
  Object.entries(data).forEach(([provinceName, regionsData]) => {
    Object.entries(regionsData).forEach(([regionName, regionData]) => {
      regionData.districts.forEach((district) => {
        districts.push({
          province: provinceName,
          region: regionName,
          district: district.district,
          zip_code: district.zip_code || null,
        });
      });
    });
  });
  return districts;
};

// Récupérer toutes les régions d’une province donnée (avec region_id et districts)
export const getFullRegionsByProvince = (province) =>
  province && data[province]
    ? Object.entries(data[province]).map(([regionName, regionData]) => ({
        region: regionName,
        region_id: regionData.region_id,
        districts: regionData.districts,
      }))
    : [];

// Récupérer tous les districts d’une région donnée (avec province et zip_code)
export const getFullDistrictsByRegion = (regionName) => {
  let districts = [];
  Object.entries(data).forEach(([provinceName, regionsData]) => {
    if (regionsData[regionName]) {
      regionsData[regionName].districts.forEach((district) => {
        districts.push({
          province: provinceName,
          region: regionName,
          district: district.district,
          zip_code: district.zip_code || null,
        });
      });
    }
  });
  return districts;
};

// Récupérer tous les districts d’une province donnée (avec région et zip_code)
export const getFullDistrictsByProvince = (province) => {
  let districts = [];
  if (province && data[province]) {
    Object.entries(data[province]).forEach(([regionName, regionData]) => {
      regionData.districts.forEach((district) => {
        districts.push({
          province,
          region: regionName,
          district: district.district,
          zip_code: district.zip_code || null,
        });
      });
    });
  }
  return districts;
};
