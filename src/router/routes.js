/* eslint-disable one-var, max-len */

// components for "browse"
const browseDir = './views/browse/',
  browse = {
    index: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}index`),
    overview: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}_overview`),
    charts: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}_charts`),
    categories: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}_categories`),
    releases: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}_releases`),
    discover: () =>
      import(/* webpackChunkName: "browse" */ `${browseDir}_discover`),
  };

// components for "artist"
const artistDir = './views/artist/',
  artist = {
    index: () =>
      import(/* webpackChunkName: "artist" */ `${artistDir}index`),
    overview: () =>
      import(/* webpackChunkName: "artist" */ `${artistDir}_overview`),
    related: () =>
      import(/* webpackChunkName: "artist" */ `${artistDir}_related`),
    about: () =>
      import(/* webpackChunkName: "artist" */ `${artistDir}_about`),
  };

// components for "user"
const userDir = './views/user/',
  user = {
    index: () =>
      import(/* webpackChunkName: "user" */ `${userDir}index`),
    overview: () =>
      import(/* webpackChunkName: "user" */ `${userDir}_overview`),
    playlists: () =>
      import(/* webpackChunkName: "user" */ `${userDir}_playlists`),
    following: () =>
      import(/* webpackChunkName: "user" */ `${userDir}_following`),
  };

// components for "mylibrary"
const mylibraryDir = './views/mylibrary/',
  mylibrary = {
    history: () =>
      import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}history`),
    tracks: () =>
      import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}tracks`),
    albums: () =>
      import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}albums`),
  };

// components for single views
const singleDir = './views/single/',
  single = {
    album: () =>
      import(/* webpackChunkName: "album" */ `${singleDir}album`),
    playlist: () =>
      import(/* webpackChunkName: "playlist" */ `${singleDir}playlist`),
    category: () =>
      import(/* webpackChunkName: "category" */ `${singleDir}category`),
  };

const otherDir = './views/other/',
  other = {
    // component for search
    search: () =>
      import(/* webpackChunkName: "search" */ `${otherDir}search`),
    // component for general settings
    settings: () =>
      import(/* webpackChunkName: "settings" */ `${otherDir}settings`),
    // component to login the user
    login: () =>
      import(/* webpackChunkName: "other" */ `${otherDir}login`),
  };

export default [{
  path: '',
  redirect: {
    name: 'browse',
  },
},
{
  path: '/browse',
  component: browse.index,
  children: [{
    path: '',
    name: 'browse',
    component: browse.overview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    component: browse.charts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    component: browse.categories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    component: browse.releases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
    component: browse.discover,
  },
  ],
},
{
  path: '/artist/:id',
  component: artist.index,
  children: [{
    path: '',
    name: 'artist',
    component: artist.overview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    component: artist.related,
  },
  {
    path: 'about',
    name: 'artistAbout',
    component: artist.about,
  },
  ],
},
{
  path: '/user/:id',
  component: user.index,
  children: [{
    path: '',
    name: 'user',
    component: user.overview,
  },
  {
    path: 'playlists',
    name: 'userPlaylists',
    component: user.playlists,
  },
  {
    path: 'following',
    name: 'userFollowing',
    component: user.following,
  },
  ],
},
{
  path: '/album/:id',
  name: 'album',
  component: single.album,
},
{
  path: '/playlist/:owner/:id',
  name: 'playlist',
  component: single.playlist,
},
{
  path: '/category/:id',
  name: 'category',
  component: single.category,
},
{
  path: '/search/:searchQuery',
  name: 'search',
  component: other.search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  component: mylibrary.history,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  component: mylibrary.tracks,
},
{
  path: '/albums',
  name: 'mylibraryAlbums',
  component: mylibrary.albums,
},
{
  path: '/settings',
  name: 'settings',
  component: other.settings,
},
{
  path: '/login',
  name: 'login',
  component: other.login,
},
];
