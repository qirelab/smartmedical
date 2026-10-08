export function StickyDisclaimer() {
  return (
    <div
      role="note"
      className="fixed bottom-0 left-0 right-0 z-30 flex h-[var(--sticky-bar-h)] items-center justify-center border-t border-gray-200 bg-white/95 px-4 text-center backdrop-blur"
    >
      <p className="text-[13px] font-semibold uppercase leading-tight tracking-wide text-gray-500 sm:text-base lg:text-lg">
        Имеются противопоказания. Необходима консультация специалиста
      </p>
    </div>
  );
}
