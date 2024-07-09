const getPhotoLink = (id: string) => {
  if (process.env.NODE_ENV === "development") return `http://localhost:3030/assets/${id}.png`;
  return `/assets/${id}.png`;
};

export default getPhotoLink;