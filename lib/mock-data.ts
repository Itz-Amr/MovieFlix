import type { MediaItem, PersonItem } from '@/types/media';

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const featured: MediaItem = {
  id: 101,
  title: 'Shadow Strike',
  subtitle: 'Chapter One',
  overview: 'A former intelligence operative is forced back into the field when a covert network threatens to destabilize Europe. Every alliance hides a secret, and every mission pulls him closer to the truth.',
  poster: img('photo-1489599849927-2ee91cede3ba', 700),
  backdrop: img('photo-1519608487953-e999c86e7455', 2200),
  rating: 8.4,
  year: '2026',
  genre: 'Action',
  kind: 'movie',
};

export const movies: MediaItem[] = [
  ['The Black Protocol','Action','photo-1485846234645-a62644f84728','photo-1517604931442-7e0c8ed2963c',8.1],
  ['Crimson Horizon','Thriller','photo-1500530855697-b586d89ba3ee','photo-1500534314209-a25ddb2bd429',7.8],
  ['Edge of Silence','Drama','photo-1478720568477-152d9b164e26','photo-1440404653325-ab127d49abc1',8.6],
  ['Final Outpost','Sci-Fi','photo-1518676590629-3dcbd9c5a5c9','photo-1500530855697-b586d89ba3ee',7.6],
  ['Night Ledger','Crime','photo-1489599849927-2ee91cede3ba','photo-1485846234645-a62644f84728',8.2],
  ['Red Meridian','Action','photo-1492691527719-9d1e07e534b4','photo-1524985069026-dd778a71c7b4',7.9],
  ['Glass Empire','Mystery','photo-1542204165-65bf26472b9b','photo-1478720568477-152d9b164e26',8.0],
  ['Last Signal','Sci-Fi','photo-1536440136628-849c177e76a1','photo-1517604931442-7e0c8ed2963c',8.5],
  ['Cold Harbor','Thriller','photo-1440404653325-ab127d49abc1','photo-1518676590629-3dcbd9c5a5c9',7.7],
  ['After Midnight','Drama','photo-1524985069026-dd778a71c7b4','photo-1492691527719-9d1e07e534b4',8.3],
].map((m, i) => ({ id: 200+i, title:m[0] as string, genre:m[1] as string, poster:img(m[2] as string,700), backdrop:img(m[3] as string,1600), rating:m[4] as number, year:String(2026-(i%5)), overview:'A cinematic story filled with conflict, discovery and unforgettable characters.', kind:'movie' as const }));

export const tvShows: MediaItem[] = [
  ['Dark District','Crime',8.8],['Zero Hour','Thriller',8.4],['The Archive','Mystery',8.1],['Northbound','Drama',7.9],['Signal Lost','Sci-Fi',8.6],['Kings of Dust','Drama',8.2]
].map((m,i)=>({id:400+i,title:m[0] as string,genre:m[1] as string,rating:m[2] as number,year:String(2026-(i%3)),poster:movies[(i+2)%movies.length].poster,backdrop:movies[(i+4)%movies.length].backdrop,overview:'An original serialized story with layered characters, suspense and cinematic world-building.',kind:'tv' as const}));

export const cast: PersonItem[] = [
  {id:1,name:'Ethan Cross',role:'Lead',photo:img('photo-1500648767791-00dcc994a43e',400)},
  {id:2,name:'Sara Kane',role:'Intelligence Officer',photo:img('photo-1494790108377-be9c29b29330',400)},
  {id:3,name:'Victor Hale',role:'Former Mentor',photo:img('photo-1507003211169-0a1dd7228f2d',400)},
  {id:4,name:'Daniel Brooks',role:'Rival Operative',photo:img('photo-1506794778202-cad84cf45f1d',400)},
  {id:5,name:'Maya Chen',role:'Tech Specialist',photo:img('photo-1531123897727-8f129e1688ce',400)},
  {id:6,name:'Marcus Reed',role:'Field Agent',photo:img('photo-1501196354995-cbb51c65aaea',400)},
];

export const genres = ['All','Action','Drama','Crime','Thriller','Sci-Fi','Mystery','Comedy'];
