export const Button = ({ children, className, action }) => {
  return (
    <button className={className} onClick={action}>
      {children}
    </button>
  );
};
