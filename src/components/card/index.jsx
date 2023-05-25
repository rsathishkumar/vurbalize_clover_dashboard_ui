function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:shadow-none pb-2 ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
