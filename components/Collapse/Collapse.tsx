interface Props {
  isCollapsed: boolean,
  onClick: () => void,
};

const defaultProps = {
  isCollapsed: false,
  onClick: () => {},
};

const Collapse = ({ isCollapsed, onClick }) => {
  return (
    <div className="flex items-center justify-center w-20 h-6 bg-blue-200 hover:bg-blue-400/40 rounded-sm cursor-pointer" onClick={onClick}>
      <span className="text-xs font-semibold text-font-blueDark flex-nowrap">{ isCollapsed ? 'Show more' : 'Show less' }</span>
    </div>
  )
};

Collapse.defaultProps = defaultProps;
export default Collapse;
