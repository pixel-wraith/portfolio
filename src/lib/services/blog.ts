import { z } from "zod";
import { DEV_TO_API_KEY } from "$env/static/private";
import { blogPostSchema } from "../schemas/blog.schema";

// Re-export schemas for convenience in server-side code
export { blogPostSchema, blogPostUserSchema } from "../schemas/blog.schema";

export class BlogService {
    public getPosts = async (page = 1, perPage = 10): Promise<z.infer<typeof blogPostSchema>[]> => {
        try {
            const res = await fetch(`https://dev.to/api/articles/me?page=${page}&per_page=${perPage}`, {
                headers: {
                    'api-key': DEV_TO_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        
            const posts = await res.json();
    
            console.log(posts);
            
            return blogPostSchema.array().parse((posts ?? []).filter((post: z.infer<typeof blogPostSchema>) => post.type_of === 'article'));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public getPostById = async (id: string): Promise<z.infer<typeof blogPostSchema> | null> => {
        try {
            const res = await fetch(`https://dev.to/api/articles/${id}`, {
                headers: {
                    'api-key': DEV_TO_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
    
            return blogPostSchema.parse(await res.json());
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
