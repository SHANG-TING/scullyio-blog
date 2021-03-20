import { ScullyRoute } from '@scullyio/ng-lib';

export type Post = ScullyRoute & {
	title: string;
	author?: string;
	image?: string;
	tags?: string;
};
