import fs from "fs";

export const removePath = (path: string) => {
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      console.error(`Erreur lors de la suppression de ${path} :`, err);
    } else {
      console.log(`${path} supprimé avec succès.`);
    }
  });
};
