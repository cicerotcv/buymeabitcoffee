export const BackgroundMesh = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="bg-btc/20 dark:bg-btc/15 absolute -top-16 -left-24 size-96
          rounded-full blur-3xl"
      />
      <div
        className="bg-lightning/15 dark:bg-lightning/10 absolute top-1/3
          -right-24 size-80 rounded-full blur-3xl"
      />
      <div
        className="bg-btc/12 dark:bg-btc/8 absolute -bottom-24 left-1/3 size-72
          rounded-full blur-3xl"
      />
    </div>
  );
};
