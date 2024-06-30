import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { SELECTED_ITEMS_KEY } from '@/constants';

export const useBookThumbnail = (id: number, thumbnail: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentMode = searchParams.get('mode') || 'view'; // 'view' | 'edit'
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (currentMode === 'view') {
      // local state isSelected 값 초기화
      setIsSelected(false);

      // url params에 selectedItems 값 삭제
      const params = new URLSearchParams(searchParams);
      params.delete(SELECTED_ITEMS_KEY);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [currentMode]);

  const handleClick = () => {
    // local state isSelected 값 업데이트
    setIsSelected((prev) => !prev);

    // url params에 selectedItems 값 업데이트
    const params = new URLSearchParams(searchParams);
    const selectedItemsParams = params.get(SELECTED_ITEMS_KEY);
    let updatedItems = selectedItemsParams ? selectedItemsParams.split(',').map(Number) : [];

    if (isSelected) {
      // id 삭제
      updatedItems = updatedItems.filter((itemId) => itemId !== id);
    } else {
      // id 추가
      updatedItems.push(id);
    }

    if (updatedItems.length > 0) {
      params.set(SELECTED_ITEMS_KEY, updatedItems.join(','));
    } else {
      params.delete(SELECTED_ITEMS_KEY);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return { isSelected, handleClick, currentMode };
};
