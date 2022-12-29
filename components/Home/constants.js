import testiPict1 from "../../public/testi-1.jpg";
import testiPict2 from "../../public/testi-2.jpg";
import testiPict3 from "../../public/testi-3.jpg";
import testiPict4 from "../../public/testi-4.jpg";
import testiPict5 from "../../public/testi-5.jpg";

export const LARGE = 1420;
export const SMALL = 1060;

export const testimonials = [
  {
    content: `"Nous avions quelques idées sur les systèmes de jeu et notamment le
          système 1 3 3 1 mais de façon assez globale et empirique… Le détails et
          la finesse de l’analyse nous ont permis de gagner en précision et en
          connaissance. De superbes outils (analyse vidéo, powerpoint…) tant
          pour les éducateurs que pour les joueurs. Je recommande vivement !
          Bravo Charles !"`,
    id: 0,
    img: testiPict1,
    jobs: ["RESPONSABLE SPORTIF COB79"],
    name: "Adrien Renault",
  },
  {
    content:
      '"Contenu pertinent et efficace. Travaillant dans un comité Départemental de rugby, et étant entraîneur en fédérale 1, les formations de Charles m’ont permis de continuer à progresser dans le métier et l’analyse du jeu. Merci encore Charles et je recommande fortement à tous entraîneurs (Pro – Fédéral – Série) les formations Up Rugby"',
    id: 1,
    img: testiPict4,
    jobs: ["ENTRAÎNEUR ESPOIR", "ENTRAÎNEUR F1", "AGENT DE DÉVELOPPEMENT FFR"],
    name: "Valentin Caillaux",
  },
  {
    content:
      '"Cette formation est ultra-complète et intéressante. Charles propose toutes les variantes de ce système offensif, chacun peut s’y reconnaître et se l’approprier. Le travail de compilation des vidéos est formidable et permet de bien comprendre la finalité de ce système. Et que dire des différents Powerpoint mis à disposition pour que chacun d’entre nous puisse les intégrer à son projet de jeu."',
    id: 2,
    img: testiPict3,
    jobs: ["ENTRAINEUR HONNEUR"],
    name: "Jean Marc Laboret",
  },
  {
    content:
      '"Très bonne formation. Facilement expliquée avec des illustrations sur des vidéos. Formateur disponible pour des explications et des approfondissements. Merci à toi. Je reviens pour d’autres formations."',
    id: 3,
    img: testiPict2,
    jobs: ["DTN ADJOINT CÔTE D'IVOIRE"],
    name: "Bakary Soumahoro",
  },
  {
    content:
      '"Voilà un expert qui met à notre disposition des connaissances et des savoirs indispensables à notre quotidien de coach pour optimiser le potentiel de nos équipes, augmenter notre pouvoir de transformation. En plus elles sont évolutives ! Bravo pour cet immense travail et cet apport à notre rugby"',
    id: 4,
    img: testiPict5,
    jobs: ["RESP. SPORTIF STADE FRANÇAIS", "CHAMPION DE FRANCE FED. 2"],
    name: "Serge Collinet",
  },
];
