export const Section = ({ className, title, children }) => {
  return (
    <>
      <section className={className}>
        <h2>{title}</h2>
        {children}
      </section>
    </>
  );
};
