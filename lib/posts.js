import fs, { read } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostData = fileNames.map((filename) =>{
        // remove .md from filename to get id
        const id = filename.replace(/\.md$/, '')

        // read markdown file as string
        const fullPath = path.join(postsDirectory, filename);

        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //user gray matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostData.sort((a,b) => {
        if(a.date < b.date){
            return 1;
        }else{
            return -1;
        }
    })
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((filename) =>{
        return {
            params: {
                id : filename.replace(/\.md$/, ''),
            }
        };
    })
}

export function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);

    const postContent = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(postContent);

    return {
        id, 
        ...matterResult.data
    }
}