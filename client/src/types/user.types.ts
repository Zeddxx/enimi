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