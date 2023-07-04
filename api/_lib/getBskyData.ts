import * as Atproto from "@atproto/api";
const { BskyAgent } = Atproto;

export type PersonalData = {
  imageUrl: string;
  bannerUrl?: string;
  displayName: string;
  handle: string;
  description?: string | null;
  location?: string | null;
  followsCount: number;
  followersCount: number;
  postsCount: number;
};

const BSKY_SERVICE = "https://bsky.social";

export const getBskyData = async (handle: string): Promise<PersonalData> => {
  (await import("dotenv")).config();

  const agent = new BskyAgent({
    service: BSKY_SERVICE,
  });
  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER as string,
    password: process.env.BSKY_APP_PASSWORD as string,
  });
  const profile = await agent
    .getProfile({ actor: handle })
    .then((res) => res.data);

  return {
    imageUrl: profile.avatar ?? "",
    bannerUrl:
      profile.banner ??
      "https://pbs.twimg.com/profile_banners/1349597520930881537/1614820019",
    displayName: profile.displayName ?? "",
    handle: profile.handle,
    description: profile.description ?? "",
    followsCount: profile.followsCount ?? 0,
    followersCount: profile.followersCount ?? 0,
    postsCount: profile.postsCount ?? 0,
  };
};
