import { unstable_noStore as noStore } from 'next/cache';
import moment from 'moment';


export const camelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, ' ').replace(/_/g, ' ');
};


export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const toArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}


export const getRange = (min: number|string, max: number|string): string|null => {
  if (!min || !max) return null;
  const minStr = String(min);
  const maxStr = String(max);

  if (minStr === "0" && minStr === maxStr) return null;
  if (minStr > maxStr) return minStr;
  return minStr === maxStr ? minStr : `${minStr}—${maxStr}`;
};


export const getNumeric = (value: number|string): string|null => {
  if (!value) return null;
  const matches = String(value).match(/(\d+\.?\d*)/);
  if (!matches) return null;
  return matches[0];
};


export const concatStrings = (values: string[], sep: string=" "): string => {
  return values.filter((v) => v).join(sep);
};


export const slugify = (str: string): string => {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};


export const getHeadings = (content: string): any => {
    return content.match(/#{2,3} .+/g)?.map((heading) => {
        const matches = heading.match(/(#{2,3}) (.+)/);
        if (matches) {
            return {
                slug: slugify(matches[2]),
                text: matches[2],
                heading: matches[1].length,
            };
        }
    });
};


export const compareColors = [
	{
		base: '#2563eb',
	},
	{
		base: '#be185d',
	},
	{
		base: '#047857',
	},
	{
		base: '#f59e0b',
	},
  {
		base: '#22c55e',
	}
];


export const timeSince = (date: string): string => {
  noStore();
  let parsedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
  let fromNow = moment(parsedDate).fromNow();
  let friendlyDate = moment(parsedDate).format('MMMM Do YYYY');
  return friendlyDate + ' (' + fromNow + ')';
}


const e = (str: string) => encodeURIComponent(encodeURIComponent(str));


export const createOgImage = ({ title, meta, publishedAt = '' }: { title: string, meta: string, publishedAt?: string }): string => {
  let date = '';
  if (publishedAt) {
    date = timeSince(publishedAt);
    date = e(date).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  return [
      // ACCOUNT PREFIX
      `https://res.cloudinary.com/dbz66bfnv/image/upload`,
      'c_scale,h_800,w_1600,q_100',

      // TITLE
      `l_text:Karla_66_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1400,h_200`,
      `fl_layer_apply,g_south_west,x_80,y_250`,

      // META
      `l_text:Karla_42:${e(meta)},co_rgb:ffe4e680,c_fit,w_1400,h_150`,
      `fl_layer_apply,g_south_west,x_80,y_110`,

      // DATE
      date && [
        `l_text:Karla_28:${date},co_rgb:ffe4e680,c_fit,w_1400`,
        `fl_layer_apply,g_south_east,x_80,y_60`,
      ],

      // BG
      `gradient-background.png`,
  ].join('/')
};


export const setLocalStorageWithExpiry = (key: string, value: any, ttl: number) => {
    if (!window) return;

    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    window.localStorage.setItem(key, JSON.stringify(item));
}


export const getLocalStorageWithExpiry = (key: string) => {
  if (!window) return null;

	const itemStr = window.localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (!item.expiry) {
		return item.value;
	}
	if (now.getTime() > item.expiry) {
		window.localStorage.removeItem(key);
		return null;
	}
	return item.value;
}
