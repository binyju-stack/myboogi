import { AppHeader } from '@/components/AppHeader';
import { BillboardRegisterForm } from '@/components/billboard/BillboardRegisterForm';
import { Page } from '@/components/screen';
import { Colors } from '@/theme';

export default function BillboardCreateScreen() {
  return (
    <Page backgroundColor={Colors.surface}>
      <AppHeader title="전광판 등록" />
      <BillboardRegisterForm />
    </Page>
  );
}
