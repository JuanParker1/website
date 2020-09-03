import {inspect} from 'util';
import fs from 'fs-extra';
import path from 'path';
import take from 'lodash/take.js';
import reverse from 'lodash/reverse.js';

import paginate from './paginate.mjs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const poetryFeed = fs.readJsonSync('.sources/poetry/dist/feed/feed.json')
 // TODO: fix these ""poems""
.reverse();

const data = {

  social:[
      { title:'GitHub',  url:'https://github.com/catpea' },
      { title:'YouTube', url:'https://www.youtube.com/playlist?list=PLOo-pqnffyOqsK6hf5tFwMqzvhogksrgW' },
      // { title:'CatPea',  url:'https://catpea.com/' },
  ],

  pages: []
    .concat(fs.readJsonSync('.sources/poetry/dist/feed/feed.json'))
    .concat([])
    .concat([])
  ,

  books:[

    {
      id:'furkies-purrkies',
      title: 'Furkies Purrkies',
      subtitle: 'Anthology of Inspirational Rhyme',
      category: "Poetry",
      author: 'Dr. Meow, Ph.D.',
      cover: 'image/cover-3.jpg',

      url: 'https://catpea.com/furkies-purrkies.html',
      audio: 'https://www.youtube.com/playlist?list=PLOo-pqnffyOqsK6hf5tFwMqzvhogksrgW',

      //
      // last: poetryFeed.slice(0,1),
      // home: poetryFeed.slice(1,14),
      //
      // latest: poetryFeed.splice(0,1),
      // recent: poetryFeed.splice(0,14),
      // more: poetryFeed.splice(0,14),
      // rest: poetryFeed,

      chronological: fs.readJsonSync('.sources/poetry/dist/feed/feed.json'),
      latest: fs.readJsonSync('.sources/poetry/dist/feed/feed.json').reverse(),
      chapters: paginate(fs.readJsonSync('.sources/poetry/dist/feed/feed.json')),

    },
    // {
    //   id:'tractatus',
    //   title: 'Tractatus',
    //   subtitle: 'Dreams of The Future',
    //   category: "Philosophy",
    //   author: 'Dr. Meow, Ph.D.',
    //   cover: 'image/tractatus.jpg',
    //
    //   url: 'https://catpea.com/furkies-purrkies.html',
    //   audio: 'https://www.youtube.com/playlist?list=PLOo-pqnffyOqsK6hf5tFwMqzvhogksrgW',
    //
    //   //
    //   // last: poetryFeed.slice(0,1),
    //   // home: poetryFeed.slice(1,14),
    //   //
    //   // latest: poetryFeed.splice(0,1),
    //   // recent: poetryFeed.splice(0,14),
    //   // more: poetryFeed.splice(0,14),
    //   // rest: poetryFeed,
    //
    //   chronological: fs.readJsonSync('.sources/poetry/dist/feed/feed.json'),
    //   latest: fs.readJsonSync('.sources/poetry/dist/feed/feed.json').reverse(),
    //   chapters: paginate(fs.readJsonSync('.sources/poetry/dist/feed/feed.json')),
    //
    // },

    // {
    //   title: 'Book Of The Warrior',
    //   category: "Philosophy",
    //   author: 'Dr. Meow, Ph.D.',
    //   cover: 'img/cover-2.png',
    //   url: 'https://catpea.com/furkies-purrkies',
    //   data:[],
    // },

    // {
    //
    //   title: 'Westland Warrior',
    //   subtitle: 'Rising By Subtle Analogy',
    //   category: "Philosophy",
    //   author: 'Dr. Meow, Ph.D.',
    //   cover: 'img/cover-1.png',
    //   url: 'https://catpea.com/furkies-purrkies',
    //
    //   recent: take(reverse(fs.readJsonSync('.sources/poetry/dist/feed/feed.json')), 14),
    //   elements: fs.readJsonSync('.sources/poetry/dist/feed/feed.json'),
    //   chapters: paginate(fs.readJsonSync('.sources/poetry/dist/feed/feed.json')),
    //
    // },

  ],


  // for stylesheet
  color:{

    name:[
      {name:'blue'},
      {name:'indigo'},
      {name:'purple'},
      {name:'pink'},
      {name:'red'},
      {name:'orange'},
      {name:'yellow'},
      {name:'green'},
      {name:'teal'},
      {name:'cyan'},
    ],

    gray:[
      {name:'white'},
      {name:'gray-100'},
      {name:'gray-200'},
      {name:'gray-300'},
      {name:'gray-400'},
      {name:'gray-500'},
      {name:'gray-600'},
      {name:'gray-700'},
      {name:'gray-800'},
      {name:'gray-900'},
      {name:'black', classes: "text-white"},
    ],

    context:[
      {name:'primary'},
      {name:'secondary'},
      {name:'success'},
      {name:'info'},
      {name:'warning'},
      {name:'danger'},
      {name:'light'},
      {name:'dark', classes: "text-white"},
    ],

  }

}

function news(data){
  const newsLocation = path.resolve();
  const news = fs.readFileSync(path.join(__dirname,'news.txt')).toString().split(/\n/).filter(i=>i).filter(i=>!i.match(/^\s*#/)).map(line=>{
    let [date, title, text] = line.split('|').map(i=>i.trim());
    return { date:(new Date(date)).toString(), title, text};
  })
  data.news = news;
}

export default async function () {

  news(data);

  return data;
}
