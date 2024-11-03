import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import HeaderLayout from '@/layout/header';
import FriendsListTabContent from '@/ui/friends/friends-list-tab-content';
import FriendsRequestTabContent from '@/ui/friends/friends-request-tab-content';

export default function FriendsSettings() {
  return (
    <>
      <HeaderLayout backButtonText="설정" title="친구 관리" />

      <div className="p-3">
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">목록</TabsTrigger>
            <TabsTrigger value="request">신청</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <FriendsListTabContent />
          </TabsContent>

          <TabsContent value="request">
            <FriendsRequestTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
