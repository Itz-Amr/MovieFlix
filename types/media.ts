export type MediaKind = 'movie' | 'tv';
export interface Genre { id:number; name:string }
export interface MediaItem { id:number; title:string; subtitle?:string; overview:string; poster:string; backdrop:string; rating:number; voteCount?:number; year:string; genre:string; genreIds?:number[]; kind:MediaKind; runtime?:number; certification?:string }
export interface PersonItem { id:number; name:string; role:string; photo:string; knownFor?:string }
export interface VideoItem { id:string; key:string; name:string; site:string; type:string; official?:boolean }
export interface ReviewItem { id:string; author:string; avatar?:string; rating?:number; content:string; createdAt:string }
export interface MediaDetails extends MediaItem { genres:Genre[]; cast:PersonItem[]; crew:PersonItem[]; videos:VideoItem[]; recommendations:MediaItem[]; similar:MediaItem[]; reviews:ReviewItem[]; status?:string; tagline?:string; language?:string; country?:string; seasons?:{id:number;name:string;seasonNumber:number;episodeCount:number;poster:string}[] }
export interface PersonDetails extends PersonItem { biography:string; birthday?:string; placeOfBirth?:string; popularity?:number; credits:MediaItem[] }
export interface PagedResult<T> { page:number; totalPages:number; totalResults:number; results:T[] }
