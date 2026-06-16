import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type ListingDraft = {
  species: string;
  price: string;
  location: string;
  sex: string;
  stage: string;
  hatchDate: string;
  shellLength: string;
  weight: string;
  foodResponse: string;
  healthStatus: string;
  notes: string;
  father: string;
  mother: string;
  description: string;
  phone: string;
  kakaoId: string;
};

export const emptyListingDraft: ListingDraft = {
  species: '',
  price: '',
  location: '',
  sex: '',
  stage: '',
  hatchDate: '',
  shellLength: '',
  weight: '',
  foodResponse: '',
  healthStatus: '',
  notes: '',
  father: '',
  mother: '',
  description: '',
  phone: '',
  kakaoId: '',
};

function FormSection({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children: ReactNode }) {
  return (
    <View className="mb-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
      <Text className="text-[9px] font-black text-berry">{eyebrow}</Text>
      <Text className="mt-1 text-[19px] font-black text-ink">{title}</Text>
      {description ? <Text className="mt-2 text-[11px] leading-5 text-muted">{description}</Text> : null}
      <View className="mt-5">{children}</View>
    </View>
  );
}

function Field({ label, value, placeholder, onChangeText, multiline = false, keyboardType = 'default', suffix, icon }: { label: string; value: string; placeholder: string; onChangeText: (value: string) => void; multiline?: boolean; keyboardType?: 'default' | 'numeric' | 'phone-pad'; suffix?: string; icon?: IconName }) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <View className={`flex-row rounded-[18px] bg-soft px-4 ${multiline ? 'min-h-32 items-start py-4' : 'items-center py-1'}`}>
        {icon ? <Ionicons name={icon} size={17} color={colors.muted} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.subtle}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          className={`${icon ? 'ml-2' : ''} ${multiline ? 'min-h-24' : 'py-3.5'} flex-1 text-[13px] text-ink`}
        />
        {suffix ? <Text className="ml-2 text-[11px] font-bold text-muted">{suffix}</Text> : null}
      </View>
    </View>
  );
}

function ChoiceField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <View className="flex-row gap-2">
        {options.map((option) => <Pressable key={option} onPress={() => onChange(option)} className={`flex-1 items-center rounded-[16px] border py-3.5 ${value === option ? 'border-berry bg-blush' : 'border-line bg-white'}`}><Text className={`text-[11px] font-black ${value === option ? 'text-berry' : 'text-muted'}`}>{option}</Text></Pressable>)}
      </View>
    </View>
  );
}

function PhotoSection() {
  return (
    <View className="mb-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
      <View className="flex-row items-end justify-between"><View><Text className="text-[9px] font-black text-berry">PHOTO</Text><Text className="mt-1 text-[19px] font-black text-ink">거북이를 보여주세요</Text></View><Text className="text-[10px] font-bold text-muted">0 / 10</Text></View>
      <Pressable className="mt-5 aspect-[4/3] items-center justify-center rounded-[22px] border border-dashed border-petal bg-blush">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"><Ionicons name="camera-outline" size={25} color={colors.berry} /></View>
        <Text className="mt-4 text-[13px] font-black text-ink">대표 사진 추가</Text>
        <Text className="mt-1.5 text-[10px] text-muted">첫 번째 사진이 대표 이미지로 보여요</Text>
      </Pressable>
      <View className="mt-3 flex-row gap-2">
        {[0, 1, 2].map((item) => <Pressable key={item} className="aspect-square flex-1 items-center justify-center rounded-[18px] bg-soft"><Ionicons name="add" size={22} color={colors.muted} /><Text className="mt-1 text-[9px] font-bold text-muted">추가</Text></Pressable>)}
      </View>
    </View>
  );
}

export function ListingForm({ draft, onChange }: { draft: ListingDraft; onChange: (key: keyof ListingDraft, value: string) => void }) {
  const field = (key: keyof ListingDraft) => ({ value: draft[key], onChangeText: (value: string) => onChange(key, value) });
  return (
    <>
      <PhotoSection />
      <FormSection eyebrow="BASIC INFO" title="기본 정보" description="분양글에서 가장 먼저 보이는 정보예요.">
        <Field label="품종명" placeholder="예: 레오파드 육지거북" icon="search-outline" {...field('species')} />
        <Field label="가격" placeholder="분양 가격을 입력해주세요" keyboardType="numeric" suffix="원" {...field('price')} />
        <Field label="지역" placeholder="거래 가능한 지역을 입력해주세요" icon="location-outline" {...field('location')} />
        <ChoiceField label="성별" options={['수컷', '암컷', '미구분']} value={draft.sex} onChange={(value) => onChange('sex', value)} />
        <ChoiceField label="성장 단계" options={['유체', '성체']} value={draft.stage} onChange={(value) => onChange('stage', value)} />
      </FormSection>

      <FormSection eyebrow="TURTLE PROFILE" title="상세 정보" description="건강 상태를 솔직하게 알려주면 신뢰도가 높아져요.">
        <Field label="부화일" placeholder="YYYY.MM.DD" icon="calendar-outline" {...field('hatchDate')} />
        <View className="flex-row gap-3"><View className="flex-1"><Field label="등갑 길이" placeholder="0.0" keyboardType="numeric" suffix="cm" {...field('shellLength')} /></View><View className="flex-1"><Field label="몸무게" placeholder="0" keyboardType="numeric" suffix="g" {...field('weight')} /></View></View>
        <Field label="먹이 반응" placeholder="주로 먹는 먹이와 반응을 알려주세요" {...field('foodResponse')} />
        <Field label="건강 상태" placeholder="현재 건강 상태를 입력해주세요" {...field('healthStatus')} />
        <Field label="특이사항" placeholder="알려야 할 특이사항이 있다면 입력해주세요" multiline {...field('notes')} />
      </FormSection>

      <FormSection eyebrow="PARENTS" title="부모 개체" description="확인 가능한 정보만 입력해도 괜찮아요.">
        <Field label="부 개체" placeholder="부 개체 품종과 특징" {...field('father')} />
        <Field label="모 개체" placeholder="모 개체 품종과 특징" {...field('mother')} />
      </FormSection>

      <FormSection eyebrow="STORY" title="소개글">
        <Field label="분양자 소개" placeholder="성격, 사육 환경, 분양 시 전달할 내용을 자세히 작성해주세요." multiline {...field('description')} />
      </FormSection>

      <FormSection eyebrow="CONTACT" title="문의 정보" description="구매 희망자가 연락할 수 있는 정보를 입력해주세요.">
        <Field label="전화번호" placeholder="010-0000-0000" keyboardType="phone-pad" icon="call-outline" {...field('phone')} />
        <Field label="카카오톡 ID" placeholder="카카오톡 ID를 입력해주세요" icon="chatbubble-outline" {...field('kakaoId')} />
      </FormSection>
    </>
  );
}
