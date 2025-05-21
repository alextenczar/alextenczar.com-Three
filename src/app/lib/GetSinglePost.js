import NotionService from "../services/notion-service";


export default async function GetSinglePost(id, database) {
    const notionService = new NotionService();

    let databaseId = process.env.BLOG_ID;
    if (database === 'projects') {
        databaseId = process.env.PROJECTS_ID;
    }
    const post = await notionService.getSinglePost(id, databaseId);

    return {
        post
    }
}
