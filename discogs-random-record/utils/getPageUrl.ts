/** Returns the page url with a randomized page */
const getPageURL = (url: string, pageNum: number) => url.replace(/&page=\d+$/g, `&page=${pageNum}`);
export default getPageURL;
