import API from "./api";

// GET /api/properties with optional filters
// Used by PropertiesPage search + filter
export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.city)         params.append("city", filters.city);
  if (filters.purpose && filters.purpose !== "Any")      params.append("purpose", filters.purpose);
  if (filters.propertyType && filters.propertyType !== "Any") params.append("propertyType", filters.propertyType);
  if (filters.minPrice)     params.append("minPrice", filters.minPrice);
  if (filters.maxPrice)     params.append("maxPrice", filters.maxPrice);
  if (filters.beds)         params.append("beds", filters.beds);

  const { data } = await API.get(`/properties?${params.toString()}`);
  return data.data.properties;
};

// GET /api/properties/:id
// Used by PropertyDetails page
export const getPropertyById = async (id) => {
  const { data } = await API.get(`/properties/${id}`);
  return data.data.property;
};

// POST /api/properties
// Used by CreatePost page
export const createProperty = async (propertyData) => {
  const { data } = await API.post("/properties", propertyData);
  return data.data.property;
};

// PUT /api/properties/:id
// Used by EditPost page
export const updateProperty = async (id, propertyData) => {
  const { data } = await API.put(`/properties/${id}`, propertyData);
  return data.data.property;
};

// DELETE /api/properties/:id
// Used by seller's MyListings delete button
export const deleteProperty = async (id) => {
  const { data } = await API.delete(`/properties/${id}`);
  return data;
};

// GET /api/properties/my-properties
// Used by SellerProfile MyListings section
export const getMyProperties = async () => {
  const { data } = await API.get("/properties/my-properties");
  return data.data.properties;
};

// POST /api/users/saved/:propertyId
// Used by Save button on PropertyDetails
export const saveProperty = async (propertyId) => {
  const { data } = await API.post(`/users/saved/${propertyId}`);
  return data;
};

// DELETE /api/users/saved/:propertyId
// Used by unsave/delete on SavedList
export const unsaveProperty = async (propertyId) => {
  const { data } = await API.delete(`/users/saved/${propertyId}`);
  return data;
};

// GET /api/users/saved
// Used by SavedList component
export const getSavedProperties = async () => {
  const { data } = await API.get("/users/saved");
  return data.data.savedProperties;
};

export { startOrGetConversation } from './messageService';