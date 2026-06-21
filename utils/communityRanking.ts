import type { Post } from '@/types';

function parsePostDate(value: string) {
  const parts = value.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!parts) return undefined;

  const [, year, month, day] = parts;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function getWeeklyPopularPosts<T extends Post>(source: T[]) {
  const datedPosts = source
    .map((post) => ({ post, date: parsePostDate(post.createdAt) }))
    .filter((item): item is { post: T; date: Date } => Boolean(item.date));

  if (!datedPosts.length) return [];

  const latestTime = Math.max(...datedPosts.map((item) => item.date.getTime()));
  const weekStart = latestTime - 6 * 24 * 60 * 60 * 1000;

  return datedPosts
    .filter((item) => item.date.getTime() >= weekStart && item.date.getTime() <= latestTime)
    .sort((a, b) => {
      const aComments = a.post.commentsCount ?? a.post.comments;
      const bComments = b.post.commentsCount ?? b.post.comments;
      const aScore = a.post.views + a.post.likes * 3 + aComments * 5;
      const bScore = b.post.views + b.post.likes * 3 + bComments * 5;
      return bScore - aScore;
    })
    .map((item) => item.post);
}
