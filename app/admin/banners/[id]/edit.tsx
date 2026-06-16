import { useLocalSearchParams } from 'expo-router';

import { AdminBannerForm } from '@/components/AdminBannerForm';
import { adminBanners } from '@/data/homeScreenData';

export default function AdminBannerEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const banner = adminBanners.find((item) => item.id === id) ?? adminBanners[0];

  return <AdminBannerForm mode="edit" initialBanner={banner} />;
}
