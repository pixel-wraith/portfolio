import type { z } from 'zod';

import { favoriteSchema, FavoriteType, goalSchema, hobbySchema } from '$lib/schemas/me.schema';

const favorites: z.infer<typeof favoriteSchema>[] = [
    /**********************************************************
     ******                     shows                    ******
     **********************************************************/
    favoriteSchema.parse({
        id: 'big-bang-theory',
        rank: 1,
        title: 'Big Bang Theory',
        url: 'https://www.imdb.com/title/tt0898266/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130950/big-bang-theory_kme1qn.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'psych',
        rank: 2,
        title: 'Psych',
        url: 'https://www.imdb.com/title/tt0491738/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130950/psych_m0ft4w.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'what-we-do-in-the-shadows',
        rank: 3,
        title: 'What We Do in the Shadows',
        url: 'https://www.imdb.com/title/tt7908628/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130952/what-we-do-in-the-shadows_mxsjr6.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'mr-robot',
        rank: 4,
        title: 'Mr. Robot',
        url: 'https://www.imdb.com/title/tt4158110/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1722735794/mr-robot_admdbf.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'the-witcher',
        rank: 5,
        title: 'The Witcher',
        url: 'https://www.imdb.com/title/tt5180504/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1722735902/the-witcher_lxgwnt.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'white-collar',
        rank: 6,
        title: 'White Collar',
        url: 'https://www.imdb.com/title/tt1358522/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130952/white-collar_jhof4c.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'the-office',
        rank: 7,
        title: 'The Office',
        url: 'https://www.imdb.com/title/tt0386676/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130951/the-office_excyyu.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'parks-and-rec',
        rank: 8,
        title: 'Parks and Rec',
        url: 'https://www.imdb.com/title/tt1266020/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130950/parks-and-rec_chvl31.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'fringe',
        rank: 9,
        title: 'Fringe',
        url: 'https://www.imdb.com/title/tt1119644/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130950/fringe_nmy9uq.jpg',
        favoriteType: FavoriteType.Show,
    }),
    favoriteSchema.parse({
        id: 'how-i-met-your-mother',
        rank: 10,
        title: 'How I Met Your Mother',
        url: 'https://www.imdb.com/title/tt0460649/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721440848/how-i-met-your-mother_beeslu.jpg',
        favoriteType: FavoriteType.Show,
    }),
    // favoriteSchema.parse({
    //     id: 'supernatural',
    //     rank: 11,
    //     title: 'Supernatural',
    //     url: 'https://www.imdb.com/title/tt0460681/',
    //     image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130951/supernatural_ytroli.jpg',
    //     favoriteType: FavoriteType.Show,
    // }),
    /**********************************************************
     ******                    movies                    ******
     **********************************************************/
    favoriteSchema.parse({
        id: 'ironman',
        rank: 1,
        title: 'Ironman',
        url: 'https://www.imdb.com/title/tt0371746/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/ironman_dycsip.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'free-guy',
        rank: 2,
        title: 'Free Guy',
        url: 'https://www.imdb.com/title/tt6264654/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/free-guy_ndhhaa.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    // favoriteSchema.parse({
    //     id: 'big-hero-6',
    //     rank: 2,
    //     title: 'Big Hero 6',
    //     url: 'https://www.imdb.com/title/tt2245084/',
    //     image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/big-hero-6_nmb0ou.jpg',
    //     favoriteType: FavoriteType.Movie,
    // }),
    favoriteSchema.parse({
        id: 'jurassic-park',
        rank: 3,
        title: 'Jurassic Park',
        url: 'https://www.imdb.com/title/tt0107290/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721440862/jurassic-park_nzcelq.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'the-nun',
        rank: 4,
        title: 'The Nun',
        url: 'https://www.imdb.com/title/tt5814060/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/the-nun_ngpecr.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'ready-player-one',
        rank: 5,
        title: 'Ready Player One',
        url: 'https://www.imdb.com/title/tt1677720/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/ready-player-one_zjkon4.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'nightmare-before-christmas',
        rank: 6,
        title: 'Nightmare Before Christmas',
        url: 'https://www.imdb.com/title/tt0107688/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/nightmare-before-christmas_dhpapj.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'v-for-vendetta',
        rank: 7,
        title: 'V for Vendetta',
        url: 'https://www.imdb.com/title/tt0434409/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1722702210/v-for-vendetta_ufvoow.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'john-wick',
        rank: 8,
        title: 'John Wick',
        url: 'https://www.imdb.com/title/tt2911666/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/john-wick_jtdeqc.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'real-steel',
        rank: 9,
        title: 'Real Steel',
        url: 'https://www.imdb.com/title/tt0433035/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721441884/real-steel_k1lrwt.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    favoriteSchema.parse({
        id: 'live-free-or-die-hard',
        rank: 10,
        title: 'Live Free or Die Hard',
        url: 'https://www.imdb.com/title/tt0337978/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721441798/live-free-or-die-hard_fajbak.jpg',
        favoriteType: FavoriteType.Movie,
    }),
    // favoriteSchema.parse({
    //     id: 'the-emoji-movie',
    //     rank: 11,
    //     title: 'The Emoji Movie',
    //     url: 'https://www.imdb.com/title/tt4877122/',
    //     image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720130939/the-emoji-movie_h3oyed.jpg',
    //     favoriteType: FavoriteType.Movie,
    // }),
    /**********************************************************
     ******                     games                    ******
     **********************************************************/
    favoriteSchema.parse({
        id: 'skyrim',
        rank: 1,
        title: 'Skyrim',
        url: 'https://elderscrolls.bethesda.net/en/skyrim10',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131015/skyrim_wbqbkx.jpg',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'magic-the-gathering',
        rank: 2,
        title: 'Magic the Gathering',
        url: 'https://magic.wizards.com/en',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721444355/magic-the-gathering_qp3ymf.png',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'chess',
        rank: 3,
        title: 'Chess',
        url: 'https://en.wikipedia.org/wiki/Chess',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131011/chess_jrzb0j.jpg',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'scrap-mechanic',
        rank: 4,
        title: 'Scrap Mechanic',
        url: 'https://www.scrapmechanic.com/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131014/scrap-mechanic_sewtmc.jpg',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'minecraft',
        rank: 5,
        title: 'Minecraft',
        url: 'https://www.minecraft.net/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131012/minecraft_k7f1qv.png',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'dungeons-and-dragons',
        rank: 6,
        title: 'Dungeons & Dragons',
        url: 'https://dnd.wizards.com/',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131011/dnd_zqhgz2.jpg',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'zelda',
        rank: 7,
        title: 'Zelda',
        url: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda_(video_game)',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1720131015/zelda_whvrkj.jpg',
        favoriteType: FavoriteType.Game,
    }),
    favoriteSchema.parse({
        id: 'poker-texas-holdem',
        rank: 8,
        title: 'Poker (Texas Hold\'em)',
        url: 'https://en.wikipedia.org/wiki/Texas_hold_%27em',
        image: 'https://res.cloudinary.com/dxpwpno1e/image/upload/c_scale,w_400/v1721444591/texas-holdem_nylu9b.webp',
        favoriteType: FavoriteType.Game,
    }),
];
const goals: z.infer<typeof goalSchema>[] = [
    goalSchema.parse({
        id: '1',
        name: 'Join the 200 mph club',
        completed: false,
        description: `All my life I've loved going fast. From street luge, to motorcycles, I love that rush. At some point in my life, I want to join the club of people who have traveled 200 miles per hour (mph) or faster on land. So far, the closest I've come is 186 mph...so close!`,
    }),
    goalSchema.parse({
        id: '2',
        name: 'Learn blacksmithing',
        completed: false,
        description: `I've always been fascinated with how people are able to smith metals for all kinds of purposes. From simple tools, to weapons, to art, it's very interesting to me. So at some point, I would like to learn this skill and apply it in some way.`,
    }),
    goalSchema.parse({
        id: '3',
        name: 'Release my own product',
        completed: false,
        description: `As an engineer, I'm constantly building things. Usually to learn some new technology or to solve a problem. But up to this point, the work has stopped once that thing was learned or the problem was solved. Eventually I would like to add the extra work to fully realize and release a tool to the public.

UPDATE—I reached this goal on 1 Nov, 2024 when I released BuzyBee!`,
    }),
    goalSchema.parse({
        id: '4',
        name: 'Start a business',
        completed: false,
        description: `I'm not looking to be the next Bill Gates or anything, but I would like to start and run my own side business at some point.`,
    }),
    goalSchema.parse({
        id: '5',
        name: 'See the 7 wonders of the world',
        completed: false,
        description: `I haven't travelled much in my life, but I want to. While doing so, I would love to see the 7 wonders of the world in person.`,
    }),
    goalSchema.parse({
        id: '6',
        name: 'Speak at a conference',
        completed: false,
        description: `I like teaching and sharing knowledge. I've done talks for bootcamp classes and smaller groups, which I really enjoyed. At some point, I would like to speak at at least one conference.`,
    }),
    goalSchema.parse({
        id: '7',
        name: 'Publish a book',
        completed: false,
        description: `I would like to publish a book at some point in my life. Most likely a fantasy novel, but who knows what the future might bring!`,
    }),
];
const hobbies: z.infer<typeof hobbySchema>[] = [
    hobbySchema.parse({
        id: '1',
        name: 'Playing D&D',
        description: '',
    }),
    hobbySchema.parse({
        id: '2',
        name: 'Tinkering With New Tech',
        description: '',
    }),
    hobbySchema.parse({
        id: '3',
        name: 'Creating Puzzles',
        description: '',
    }),
    hobbySchema.parse({
        id: '4',
        name: 'Creating Fantasy Worlds',
        description: '',
    }),
    hobbySchema.parse({
        id: '5',
        name: 'Playing Video Games',
        description: '',
    }),
    hobbySchema.parse({
        id: '6',
        name: 'Watching Bad Horror Movies',
        description: '',
    }),
    hobbySchema.parse({
        id: '7',
        name: 'Drawing',
        description: '',
    }),
    hobbySchema.parse({
        id: '8',
        name: 'Reading',
        description: '',
    }),
    hobbySchema.parse({
        id: '9',
        name: 'Snuggling Our Puppies',
        description: '',
    }),
    hobbySchema.parse({
        id: '10',
        name: 'Grilling and Smoking Meat',
        description: '',
    }),
];

export class MeService {
    public getAllFavorites = async (): Promise<z.infer<typeof favoriteSchema>[]> => {
        return favorites;
    };

    public getFavoriteMovies = async (): Promise<z.infer<typeof favoriteSchema>[]> => {
        return favorites.filter(favorite => favorite.favoriteType === FavoriteType.Movie);
    };

    public getFavoriteShows = async (): Promise<z.infer<typeof favoriteSchema>[]> => {
        return favorites.filter(favorite => favorite.favoriteType === FavoriteType.Show);
    };

    public getFavoriteGames = async (): Promise<z.infer<typeof favoriteSchema>[]> => {
        return favorites.filter(favorite => favorite.favoriteType === FavoriteType.Game);
    };

    public getGoals = async (): Promise<z.infer<typeof goalSchema>[]> => {
        return goals;
    };

    public getHobbies = async (): Promise<z.infer<typeof hobbySchema>[]> => {
        return hobbies;
    };
}
