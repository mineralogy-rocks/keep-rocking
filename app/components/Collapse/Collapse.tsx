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
    <div className="flex items-center justify-center w-20 h-6 p-1 bg-sky-200 dark:bg-slate-800 hover:bg-blue-400/40 dark:hover:bg-slate-600/40 rounded-sm cursor-pointer" onClick={onClick}>
      <span className="text-xs font-semibold text-font-blueDark dark:text-font-blue flex-nowrap">{ isCollapsed ? 'Show more' : 'Show less' }</span>
    </div>
  )
};

export default Collapse;
