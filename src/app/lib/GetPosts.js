import NotionService from "../services/notion-service";


export default async function GetPosts(database, locale) {
    const notionService = new NotionService();

    let databaseId = process.env.BLOG_ID;
    if (database === 'projects') {
        databaseId = process.env.PROJECTS_ID;
    }
    const posts = await notionService.getPublishedPosts(databaseId, locale);

    return {
        posts
    }
}
