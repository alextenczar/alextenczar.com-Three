import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export default class NotionService {
    constructor() {
        this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
        this.n2m = new NotionToMarkdown({ notionClient: this.client });
    }

    async getPublishedPosts(databaseId, locale) {
        const database = databaseId ?? '';
        const lang = locale ?? '';

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                and: [
                    {
                        property: 'Published',
                        checkbox: {
                            equals: true
                        }
                    },
                    {
                        property: 'Lang',
                        rich_text: {
                            contains: lang.toString()
                        }
                    }
                ]
            },
            sorts: [
                {
                    property: 'Order',
                    direction: 'ascending'
                }
            ]
        });

        return response.results.map(res => {
            return NotionService.pageToPostTransformer(res);
        });
    }

    async getSinglePost(slug, databaseId) {
        let post, markdown;

        const database = databaseId ?? '';

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'Slug',
                formula: {
                    string: {
                        contains: slug
                    }
                }
            },
            sorts: [
                {
                    property: 'Updated',
                    direction: 'descending'
                }
            ]
        });

        if (!response.results[0]) {
            throw 'No results available';
        }

        const page = response.results[0];

        const mdBlocks = await this.n2m.pageToMarkdown(page.id);
        markdown = this.n2m.toMarkdownString(mdBlocks);
        post = NotionService.pageToPostTransformer(page);

        return {
            post,
            markdown
        };
    }

    static pageToPostTransformer(page) {
        let cover = page.cover;

        switch (cover?.type) {
            case 'file':
                cover = page.cover.file;
                break;
            case 'external':
                cover = page.cover.external.url;
                break;
            default:
                cover = '';
        }

        return {
            id: page.id,
            cover: cover,
            title: page.properties.Name.title[0].plain_text,
            tags: page.properties.Tags.multi_select,
            description: page.properties.Description.rich_text[0].plain_text,
            date: page.properties.Updated.last_edited_time,
            slug: page.properties.Slug.formula.string,
            properties: page.properties
        };
    }
}
