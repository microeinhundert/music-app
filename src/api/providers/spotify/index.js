/* eslint-disable one-var */
import axios from 'axios';

const country = 'getters/user/getCountry',
  locale = 'getters/user/getLocale',
  market = 'getters/user/getMarket',
  shuffleState = 'getters/playback/getCurrentPlayback',
  deviceId = 'getters/player/getDeviceId';

// register spotify axios instance
export const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

// get featured playlists
export const getFeaturedPlaylists = () => spotify({
  method: 'get',
  url: '/browse/featured-playlists',
  params: {
    country,
  },
});

// get new releases
export const getNewReleases = () => spotify({
  method: 'get',
  url: '/browse/new-releases',
  params: {
    country,
  },
});

// get charts
export const getCharts = () => spotify({
  method: 'get',
  url: '/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF',
});

// get categories
export const getCategories = () => spotify({
  method: 'get',
  url: '/browse/categories',
  params: {
    limit: 15,
    locale,
    country,
  },
});

// get artist info
export const getArtistInfo = ({ id }) => spotify({
  method: 'get',
  url: `/artists/${id}`,
});

// get this artist's top tracks
export const getTopTracks = ({ id }) => spotify({
  method: 'get',
  url: `/artists/${id}/top-tracks`,
  params: {
    country,
  },
});

// get artist's albums
export const getAlbums = ({ id, type }) => spotify({
  method: 'get',
  url: `/artists/${id}/albums`,
  params: {
    market,
    album_type: type,
  },
});

// get artists related to another artist
export const getRelatedArtists = ({ id }) => spotify({
  method: 'get',
  url: `/artists/${id}/related-artists`,
});

// get current user's profile data
export const getMyProfile = () => spotify({
  method: 'get',
  url: '/me',
  params: {
    market,
  },
});

// get current user's playlists
export const getMyPlaylists = () => spotify({
  method: 'get',
  url: '/me/playlists',
  params: {
    market,
  },
});

// get current user's playback history
export const getMyPlaybackHistory = ({ type }) => spotify({
  method: 'get',
  url: '/me/player/recently-played',
  params: {
    type,
  },
});

// get single album
export const getAlbum = ({ id }) => spotify({
  method: 'get',
  url: `/albums/${id}`,
  params: {
    market,
  },
});

// get single playlist
export const getPlaylist = ({ owner, id }) => spotify({
  method: 'get',
  url: `/users/${owner}/playlists/${id}`,
  params: {
    market,
  },
});

// get single category
export const getCategoryInfo = ({ id }) => spotify({
  method: 'get',
  url: `/browse/categories/${id}`,
  params: {
    locale,
    country,
  },
});

// get single category's playlists
export const getCategoryPlaylists = ({ id }) => spotify({
  method: 'get',
  url: `/browse/categories/${id}/playlists`,
  params: {
    locale,
    country,
  },
});

// get user profile
export const getUser = ({ id }) => spotify({
  method: 'get',
  url: `/users/${id}`,
});

// check if current user if following artist or user
export const isFollowingArtistOrUser = ({ type, ids }) => spotify({
  method: 'get',
  url: '/me/following/contains',
  params: {
    type,
    ids,
  },
});

// follow or unfollow an artist or user
export const followArtistOrUser = ({ action, type, ids }) => spotify({
  method: action === 'follow' ? 'put' : 'delete',
  url: '/me/following',
  params: {
    type,
    ids,
  },
});

// check if current user if following playlist
export const isFollowingPlaylist = ({ ownerId, playlistId, ids }) => spotify({
  method: 'get',
  url: `/users/${ownerId}/playlists/${playlistId}/followers/contains`,
  params: {
    ids,
  },
});

// follow or unfollow a playlist
export const followPlaylist = ({ action, ownerId, playlistId }) => spotify({
  method: action === 'follow' ? 'put' : 'delete',
  url: `users/${ownerId}/playlists/${playlistId}/followers`,
});

// get results for search query
export const getSearchResults = ({ type, searchQuery, limit }) => spotify({
  method: 'get',
  url: '/search',
  params: {
    type,
    market,
    limit,
    q: searchQuery,
  },
});

// skip playback to previous or next track
export const skipTo = ({ direction }) => spotify({
  method: 'post',
  url: `/me/player/${direction}`,
  params: {
    device_id: deviceId,
  },
});

// seek playback to position in track
export const seekTo = ({ position }) => spotify({
  method: 'put',
  url: '/me/player/seek',
  params: {
    device_id: deviceId,
    position_ms: position,
  },
});

// set playback state and track
export const setPlayback = ({ state, uris }) => spotify({
  method: 'put',
  url: `/me/player/${state}`,
  data: {
    uris,
  },
  params: {
    device_id: deviceId,
  },
});

// toggle repeat for playback
export const toggleRepeat = () => spotify({
  method: 'put',
  url: '/me/player/repeat',
  params: {
    state: 'context',
    device_id: deviceId,
  },
});

// set shuffle state for playback
export const setShuffle = () => spotify({
  method: 'put',
  url: '/me/player/shuffle',
  params: {
    state: !shuffleState,
    device_id: deviceId,
  },
});

// get the current playback
export const getPlayback = () => spotify({
  method: 'get',
  url: '/me/player',
  params: {
    market,
  },
});
