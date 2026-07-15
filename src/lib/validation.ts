import { z } from "zod";
export const postInputSchema=z.object({title:z.string().trim().min(1,"请输入文章标题").max(200),slug:z.string().trim().min(1,"请输入 Slug").max(200).regex(/^[a-z0-9\u4e00-\u9fa5-]+$/,"Slug 格式不正确"),excerpt:z.string().trim().max(500).nullable().optional(),content:z.string().min(1,"正文不能为空"),cover_url:z.string().url().nullable().optional(),status:z.enum(["draft","published"])});

