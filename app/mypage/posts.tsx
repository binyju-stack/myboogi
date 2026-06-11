import { MyListLayout } from '@/components/MyListLayout';
import { PostCard } from '@/components/PostCard';
import { posts } from '@/data/mockData';

export default function MyPostsScreen() {
  const myPosts = posts.slice(0, 3);
  return <MyListLayout title="내 게시글" eyebrow="MY COMMUNITY" description="내가 작성한 이야기와 반응을 확인해요." count={myPosts.length}>{myPosts.map((item, index) => <PostCard key={item.id} item={item} index={index} />)}</MyListLayout>;
}
