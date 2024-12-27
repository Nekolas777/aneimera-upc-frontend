export const formatText = (title: string) => {
  const feminineTitles = ["ponencia", "visita"];
  const article = feminineTitles.includes(title.toLowerCase()) ? "una" : "un";
  const adjective = feminineTitles.includes(title.toLowerCase())
    ? "nueva"
    : "nuevo";
  return { article, adjective };
};
