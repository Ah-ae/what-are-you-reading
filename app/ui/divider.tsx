type Props = { children?: React.ReactNode };

export default function Divider({ children }: Props) {
  return (
    <div className="w-full flex items-center">
      <div className="flex-grow h-px bg-neutral-400" />
      {children && (
        <>
          <span className="px-3 text-sm">{children}</span>
          <div className="flex-grow h-px bg-neutral-400" />
        </>
      )}
    </div>
  );
}
