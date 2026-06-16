import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, View } from 'react-native';

import { AnimatedPressable, FadeInView } from '@/components/AnimatedPressable';
import { TopBar } from '@/components/common';
import { Page } from '@/components/screen';
import { colors } from '@/constants/theme';
import { turtles, userProfile } from '@/data/mockData';

const interestOptions = ['다이아몬드백 테라핀', '레드풋', '설가타', '머스크터틀', '맵터틀'];

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[11px] font-black text-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtle}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-[18px] bg-soft px-4 text-[13px] font-bold text-ink ${multiline ? 'min-h-[104px] py-4 leading-6' : 'h-[52px] py-3.5'}`}
      />
    </View>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View className="mb-3 w-[48%] rounded-[18px] bg-soft px-4 py-3.5">
      <Text className="text-[9px] font-bold text-muted">{label}</Text>
      <Text className="mt-1 text-[18px] font-black text-ink">{value.toLocaleString()}</Text>
    </View>
  );
}

export default function ProfileEditScreen() {
  const [nickname, setNickname] = useState(userProfile.nickname);
  const [bio, setBio] = useState(userProfile.bio);
  const [region, setRegion] = useState(userProfile.region);
  const [instagram, setInstagram] = useState(userProfile.instagram);
  const [blog, setBlog] = useState(userProfile.blog);
  const [youtube, setYoutube] = useState(userProfile.youtube);
  const [openChat, setOpenChat] = useState(userProfile.openChat);
  const [interests, setInterests] = useState(userProfile.interests);

  const toggleInterest = (interest: string) => {
    setInterests((current) => (
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    ));
  };

  return (
    <Page>
      <TopBar title="프로필 수정" />

      <View className="bg-white px-5 pb-6 pt-4">
        <Text className="text-[10px] font-black text-berry">MY PROFILE</Text>
        <Text className="mt-1 text-[24px] font-black text-ink">내 정보를 깔끔하게 정리해요</Text>
        <Text className="mt-2 text-[11px] leading-5 text-muted">프로필, SNS, 관심 품종은 나중에 실제 계정 정보와 연결됩니다.</Text>
      </View>

      <View className="px-5 pt-5">
        <FadeInView>
          <View className="items-center rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <View className="h-24 w-24 overflow-hidden rounded-[32px] bg-shell">
              <Image source={{ uri: turtles[0].image }} className="h-full w-full" resizeMode="cover" />
            </View>
            <AnimatedPressable onPress={() => Alert.alert('프로필 사진 변경 기능은 준비중입니다.')} className="mt-4 flex-row items-center rounded-full bg-blush px-4 py-3">
              <Ionicons name="camera-outline" size={15} color={colors.berry} />
              <Text className="ml-1.5 text-[11px] font-black text-berry">프로필 사진 변경</Text>
            </AnimatedPressable>
          </View>
        </FadeInView>

        <FadeInView delay={45}>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="mb-4 text-[15px] font-black text-ink">기본 정보</Text>
            <Field label="닉네임" value={nickname} onChangeText={setNickname} placeholder="느린숲" />
            <Field label="자기소개" value={bio} onChangeText={setBio} placeholder="테라핀 전문 브리더" multiline />
            <Field label="활동 지역" value={region} onChangeText={setRegion} placeholder="서울 송파구" />
          </View>
        </FadeInView>

        <FadeInView delay={90}>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="mb-4 text-[15px] font-black text-ink">SNS 정보</Text>
            <Field label="인스타그램" value={instagram} onChangeText={setInstagram} placeholder="https://instagram.com/..." />
            <Field label="블로그" value={blog} onChangeText={setBlog} placeholder="https://blog.example.com/..." />
            <Field label="유튜브" value={youtube} onChangeText={setYoutube} placeholder="https://youtube.com/..." />
            <Field label="카카오 오픈채팅" value={openChat} onChangeText={setOpenChat} placeholder="https://open.kakao.com/..." />
          </View>
        </FadeInView>

        <FadeInView delay={135}>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="text-[15px] font-black text-ink">관심 품종</Text>
            <View className="mt-4 flex-row flex-wrap">
              {interestOptions.map((interest) => {
                const selected = interests.includes(interest);

                return (
                  <AnimatedPressable
                    key={interest}
                    onPress={() => toggleInterest(interest)}
                    className={`mb-2 mr-2 flex-row items-center rounded-full px-3.5 py-2.5 ${selected ? 'bg-ink' : 'border border-line bg-white'}`}
                  >
                    {selected ? <Ionicons name="checkmark" size={13} color="white" /> : null}
                    <Text className={`${selected ? 'ml-1 text-white' : 'text-muted'} text-[11px] font-black`}>{interest}</Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={180}>
          <View className="mt-4 rounded-[26px] border border-line bg-white p-5 shadow-sm">
            <Text className="text-[15px] font-black text-ink">활동 통계</Text>
            <View className="mt-4 flex-row flex-wrap justify-between">
              <StatCard label="게시글 수" value={userProfile.stats.posts} />
              <StatCard label="댓글 수" value={userProfile.stats.comments} />
              <StatCard label="분양글 수" value={userProfile.stats.listings} />
              <StatCard label="팔로워 수" value={userProfile.stats.followers} />
              <StatCard label="팔로잉 수" value={userProfile.stats.following} />
            </View>
          </View>
        </FadeInView>

        <AnimatedPressable onPress={() => Alert.alert('프로필 저장 기능은 준비중입니다.')} className="mt-5 items-center rounded-[20px] bg-berry py-4 shadow-sm">
          <Text className="text-[13px] font-black text-white">프로필 저장</Text>
        </AnimatedPressable>
      </View>
    </Page>
  );
}
