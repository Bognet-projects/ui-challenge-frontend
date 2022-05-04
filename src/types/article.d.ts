import {UserType} from "@/types/userType";

export interface ArticleType{
    id: number,
    slug: string,
    title: string,
    description: string,
    body: string,
    created: number,
    updated: number,
    tagList: string[],
    favoriteCount: number,
    author: UserType
}
