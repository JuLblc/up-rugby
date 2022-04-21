import Link from "next/link";

const Exercices = () => {
  return (
    <main>
      <h1>Page Exercices</h1>
      <Link href="/exercices/create-exercice">
        <a>Ajouter une catégorie d'exercices</a>
      </Link>
    </main>
  );
};

export default Exercices;
