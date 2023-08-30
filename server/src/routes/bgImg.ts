import redisClient from '@/database/redis';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

config();

export const validator = z.object({
	time: z.enum(['early', 'noon', 'evening', 'late']),
	working: z.string().regex(/^(true|false)$/),
});

export async function getBgImg(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { time, working } = validator.parse(req.query);
		// check redis for relevant picture
		const img = await redisClient.get(
			time + (working === 'true' ? '-working' : '-resting'),
		);
		// if not found, fetch from unsplash
		// construct url and queries
		const url = new URL('https://api.unsplash.com/photos/random');
		const queries = [
			[
				'query',
				`nature,${time},${
					working === 'true' ? 'bright,energetic' : 'calm,relaxing'
				}`,
			],
			['orientation', 'landscape'],
			['count', '1'],
			['featured', 'true'],
			['content_filter', 'high'],
		];
		queries.forEach(([key, value]) => url.searchParams.append(key, value));
		console.log(url.toString());

		if (img) {
			return res.status(200).json({ href: JSON.parse(img) });
		}
		const response = await fetch(url.toString(), {
			headers: {
				'Accept-Version': 'v1',
				Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
			},
		});
		const data = await response.json();
		if (!data) throw new Error('No data from unsplash');
		if (data.errors) throw new Error(data.errors[0]);
		// set redis cache for 24 hours
		await redisClient.setEx(
			time + (working ? '-working' : '-resting'),
			60 * 60 * 24,
			JSON.stringify(data[0].urls),
		);
		// respond with data
		return res.status(200).json({ href: data[0].urls });
	} catch (err) {
		next(err);
	}
}

// export validator as type for use in other files
export type TBgImg<T extends 'req' | 'res'> = T extends 'req'
	? z.infer<typeof validator>
	: {
			href: {
				raw: string;
				full: string;
				regular: string;
				small: string;
				thumb: string;
			};
	  };
