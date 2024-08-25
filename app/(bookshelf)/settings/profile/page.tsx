import { notFound } from 'next/navigation';
import { getUser } from '@/lib/data';
import HeaderLayout from '@/layout/header';
import BackButton from '@/ui/back-button';
import EditableBox from '@/ui/editable-box';

const containerStyles = 'px-4 py-3 flex justify-between border-y-[1px] dark:border-neutral-700';
const beforePseudoElementStyles =
  'before:content-[attr(data-before)] before:absolute before:-translate-y-10 before:text-neutral-500';

export default async function ProfileSettings() {
  const user = await getUser();

  if (!user) notFound();

  return (
    <>
      <HeaderLayout>
        <BackButton>설정</BackButton>
        <div>
          <h2 className="text-xl font-medium dark:text-neutral-200">계정</h2>
        </div>
        <div />
        <div />
      </HeaderLayout>

      <div className="pt-10 flex flex-col gap-12 bg-zinc-100 dark:bg-zinc-900 *:bg-white *:dark:bg-zinc-800">
        <div data-before="이름" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <EditableBox id={user.id} field="name" text={user.name ?? ''} />
        </div>
        <div data-before="자기소개" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <EditableBox id={user.id} field="description" text={user.description ?? ''} />
        </div>
      </div>
    </>
  );
}
