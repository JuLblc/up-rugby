const Exercices = () => {
    return (  
        <>
        <h1>Page Exercices</h1>
        <h2>Tous les exercices sont affichés</h2>
        <ul>
            <li>Visiteurs</li>
            <li>Utilisateurs connectés</li>
            <li>Utilisateurs abonnés</li>
            <li>/!\ Seuls les abonnés peuvent accéder à la vidéo /!\</li>
        </ul>
    </>
    );
}
 
export default Exercices;

//Server side rendering
//export const getServerSideProps = async () => {
//}