'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/ui/modals/modal';
import DefaultAvatar from '@/ui/default-avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { getFriendsList } from '@/friends/actions';
import { createLoan } from '@/(bookshelf)/loan/actions';
import type { FriendInfo } from '@/types/friends';

type Props = {
  closeModal: () => void;
  bookId: number;
};

export default function LendBookModal({ closeModal, bookId }: Props) {
  const [friends, setFriends] = useState<FriendInfo[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [manualName, setManualName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('friend');

  useEffect(() => {
    getFriendsList().then((list) => {
      setFriends(list.sort((a, b) => a.name.localeCompare(b.name, 'ko')));
      setIsLoading(false);
    });
  }, []);

  const handleConfirm = async () => {
    try {
      if (activeTab === 'friend' && selectedFriendId) {
        await createLoan(bookId, selectedFriendId);
      } else if (activeTab === 'manual' && manualName.trim()) {
        await createLoan(bookId, undefined, manualName.trim());
      }
      closeModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : '대출에 실패했습니다.');
    }
  };

  return (
    <Modal>
      <Modal.Title>빌려주기</Modal.Title>
      <div className="mt-3">
        <Tabs defaultValue="friend" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="friend" className="data-[state=active]:border-blue-500">친구 선택</TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:border-blue-500">직접 입력</TabsTrigger>
          </TabsList>

          <div className="h-48">
            <TabsContent value="friend">
              {isLoading ? (
                <p className="text-sm text-gray-500 py-2">로딩 중...</p>
              ) : friends.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">등록된 친구가 없습니다.</p>
              ) : (
                <ul className="max-h-40 overflow-y-auto">
                  {friends.map((friend) => (
                    <li key={friend.id}>
                      <label className="py-1 flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="friend"
                          checked={selectedFriendId === friend.id}
                          onChange={() => setSelectedFriendId(friend.id)}
                          className="accent-blue-500"
                        />
                        {friend.avatar ? (
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            width={40}
                            height={40}
                            className="size-10 rounded-full object-cover"
                          />
                        ) : (
                          <DefaultAvatar className="size-10" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{friend.name}</span>
                          <span className="text-xs text-neutral-500">
                            {friend.username.slice(0, 5)} {friend.username.slice(5)}
                          </span>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="manual">
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="빌려갈 사람 이름"
                className="w-full px-3 py-2 text-sm border rounded-md dark:bg-zinc-800 dark:border-zinc-600"
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Modal.Footer>
        <Modal.CancelButton onClick={closeModal}>취소</Modal.CancelButton>
        <Modal.OkButton onClick={handleConfirm}>확인</Modal.OkButton>
      </Modal.Footer>
    </Modal>
  );
}
