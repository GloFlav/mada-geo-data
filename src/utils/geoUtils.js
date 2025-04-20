/** @format */

import data from "../data/madaGeoData.json";

// Récupérer toutes les provinces
export const getProvinces = () => Object.keys(data);

// Récupérer les régions (nom + ID) pour une province donnée
export const getRegionsByProvince = (province) =>
  province && data[province]
    ? Object.entries(data[province]).map(([regionName, regionData]) => ({
        name: regionName,
        region_id: regionData.region_id,
      }))
    : [];

// Récupérer tous les districts (avec code postal) pour une région d’une province donnée
export const getDistrictsByProvinceAndRegion = (province, region) =>
  province && region && data[province]?.[region]?.districts
    ? data[province][region].districts.map((district) => ({
        district: district.district,
        zip_code: district.zip_code || null,
      }))
    : [];

// Récupérer tous les districts (avec code postal) d’une province donnée
export const getDistrictsByProvince = (province) => {
  let districts = [];
  if (province && data[province]) {
    Object.values(data[province]).forEach((region) => {
      districts = [
        ...districts,
        ...region.districts.map((district) => ({
          district: district.district,
          zip_code: district.zip_code || null,
        })),
      ];
    });
  }
  return districts;
};

// Récupérer tous les districts (avec code postal) pour une région (toutes provinces confondues)
export const getDistrictsByRegion = (regionName) => {
  let districts = [];
  Object.values(data).forEach((province) => {
    if (province[regionName]) {
      districts = [
        ...districts,
        ...province[regionName].districts.map((district) => ({
          district: district.district,
          zip_code: district.zip_code || null,
        })),
      ];
    }
  });
  return districts;
};

// Récupérer tous les districts avec leur code postal (toutes régions, toutes provinces)
export const getDistrictsWithZipCode = () => {
  let districts = [];
  Object.values(data).forEach((province) => {
    Object.values(province).forEach((region) => {
      districts = [
        ...districts,
        ...region.districts
          .filter((d) => d.zip_code)
          .map((district) => ({
            district: district.district,
            zip_code: district.zip_code,
          })),
      ];
    });
  });
  return districts;
};

// Récupérer tous les districts sans code postal
export const getDistrictsWithoutZipCode = () => {
  let districts = [];
  Object.values(data).forEach((province) => {
    Object.values(province).forEach((region) => {
      districts = [
        ...districts,
        ...region.districts
          .filter((d) => !d.zip_code)
          .map((district) => district.district),
      ];
    });
  });
  return districts;
};

// Récupérer les districts avec et sans code postal pour une province
export const getDistrictsWithAndWithoutZipCodeByProvince = (province) => {
  let withZipCode = [];
  let withoutZipCode = [];
  if (province && data[province]) {
    Object.values(data[province]).forEach((region) => {
      region.districts.forEach((district) => {
        if (district.zip_code) {
          withZipCode.push({
            district: district.district,
            zip_code: district.zip_code,
          });
        } else {
          withoutZipCode.push(district.district);
        }
      });
    });
  }
  return { withZipCode, withoutZipCode };
};

// Récupérer les districts avec et sans code postal pour une région
export const getDistrictsWithAndWithoutZipCodeByRegion = (regionName) => {
  let withZipCode = [];
  let withoutZipCode = [];
  Object.values(data).forEach((province) => {
    if (province[regionName]) {
      province[regionName].districts.forEach((district) => {
        if (district.zip_code) {
          withZipCode.push({
            district: district.district,
            zip_code: district.zip_code,
          });
        } else {
          withoutZipCode.push(district.district);
        }
      });
    }
  });
  return { withZipCode, withoutZipCode };
};

// Récupérer l'ID d'une région à partir de son nom (toutes provinces confondues)
export const getRegionIdByName = (regionName) => {
  for (const province of Object.values(data)) {
    if (province[regionName]) {
      return province[regionName].region_id;
    }
  }
  return null;
};
