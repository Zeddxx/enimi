export type ICurrentUser = {
  username: string;
  email: string;
  _id: string;
  verified: boolean;
  avatarUrl: string;
};

export interface WatchLaterSchemaTypes {
  animeId: string;
  coverImage: string;
  title: string
  format: string
  bannerImage: string
  _id?: string
}

export type ICurrentlyWatching = {
  episodeId: string
  episodeNumber: string
  owner: string
  poster: string
  title: string
  _id: string
}