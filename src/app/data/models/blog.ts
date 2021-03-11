import { ScullyRoute } from "@scullyio/ng-lib";

export type Blog = ScullyRoute & {
  author?: string;
  image?: string;
  tags?: string;
};

