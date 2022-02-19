/** From your amount of pages get a random number */
const getRandomPage = (min = 1, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export default getRandomPage;
