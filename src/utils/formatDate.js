export const formatDate = (date) => {
  return new Date(date.seconds * 1000).toLocaleDateString("vi-VI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
