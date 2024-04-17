interface Props {
  isCollapsed: boolean,
  onClick: () => void,
};

const defaultProps = {
  isCollapsed: false,
  onClick: () => {},
};

const Collapse: React.FC<Props> = (props) => {
  const { isCollapsed, onClick } = { ...defaultProps, ...props};

  return (
    <div className="flex items-center justify-center w-20 h-6 p-1 cursor-pointer" onClick={onClick}>
      <span className="text-xs font-semibold text-font-blueDark hover:text-sky-500 dark:text-font-blue dark:hover:text-sky-300 flex-nowrap">{ isCollapsed ? 'Show more' : 'Show less' }</span>
    </div>
  )
};

export default Collapse;
