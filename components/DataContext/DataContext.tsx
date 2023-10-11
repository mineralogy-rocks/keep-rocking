import { useRef, useState } from "react";

import Dot from "@/components/Dot";
import ColorChip from "@/components/ColorChip";
import cx from "clsx";
import useSelection from "@/hooks/use-selection.hook";
import { SECTION_FIELDS, FIELDS } from "@/lib/constants";
import { Fragment } from "react";
import RelationChip from "@/components/RelationChip";
import CellChart from "@/components/CellChart";

import UtilsStyles from "@/styles/utils.module.scss";


interface colorEntitiesProps {
  items: any,
  minerals: any,
  selected: any,
  hoverClass?: string,
};

const colorEntitiesDefaultProps = {
  items: [],
  minerals: [],
  selected: [],
  hoverClass: "",
};


const ColorEntities = ({ items, minerals, selected, hoverClass, ...props } : colorEntitiesProps & typeof colorEntitiesDefaultProps) => {

  const _isHovered = (ids: string | string[]) => {
    if (!Array.isArray(ids)) ids = [ids];
    return selected.length > 0 && !ids.some(id => selected.includes(id));
  };

  const _getColor = (id) => {
    return minerals.find(mineral => mineral.id === id)?.color;
  }

  return (
    <div className="col-span-3 flex flex-col flex-wrap gap-2">
      {items.map((item, index) => {

          return (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                <div className="flex w-4 mr-2">
                  {item.ids.map((id) => {
                    return (
                      <Dot key={id} color={_getColor(id)} isHovered={_isHovered(id)} />
                    )}
                  )}
                </div>
                <ColorChip type={item.value} hasPadding={false} className={cx(hoverClass, _isHovered(item.ids) ? 'opacity-20' : '')}>
                </ColorChip>
              </div>
              <ul className="flex flex-wrap mt-1 relative ml-2 list-none text-xs text-font-secondary">
                {item.children.map((child, index) => {
                  return (
                  <li key={index} className="ml-2 flex items-center relative pb-2">
                    <div className="flex">
                      {child.ids.map((id) => {
                        return (
                          <Dot key={id} size='small' color={_getColor(id)} isHovered={_isHovered(id)} />
                        )}
                      )}
                    </div>
                    <span className={cx("ml-2", hoverClass, _isHovered(child.ids) ? 'opacity-20' : '')}>{child.value}</span>
                  </li>
                )}
                )}
              </ul>
            </div>
          )}
      )}
    </div>
  )
}

interface groupedColorEntitiesProps {
  items: any,
};

const groupedColorEntitiesDefaultProps = {
  items: [],
};

const GroupedColorEntities = ({ items, ...props } : groupedColorEntitiesProps & typeof groupedColorEntitiesDefaultProps) => {

  return (
    <div className="col-span-3 flex flex-col flex-wrap divide-slate-300 divide-y">
      {items.map((item, index) => {
          return (
            <div key={index} className="flex items-center py-2">
              <div className="flex items-center">
                <div className="flex-none w-4 mr-2">
                  <ColorChip type={item.key} hasPadding={false} className="flex items-center justify-center">
                    <span>{item.value}</span>
                  </ColorChip>
                </div>
              </div>
              <ul className="flex flex-wrap relative gap-1 ml-2 list-none text-xs text-font-secondary font-normal">
                {item.entities.map((entity, index) => {
                  return (
                    <li key={index} className="flex items-center relative">
                      <span className="bg-white border px-1 py-0.5 rounded">{entity}</span>
                    </li>
                  )}
                )}
              </ul>
            </div>
          )}
      )}
    </div>
  )
}

interface mineralContextProps {
  contextKey: string,
  minerals: {
    id: string,
    name: string,
    slug: string,
    color: string,
    statuses: [number],
  }[],
  items: any,
}

const mineralContextDefaultProps = {
  contextKey: '',
  minerals: [],
  items: {},
}

const MineralDataContext = ({ contextKey, minerals, items } : mineralContextProps & typeof mineralContextDefaultProps) => {
  // TODO: make it work with multiple contexts and use SECTION_FIELDS
  const [selected, handleSelection] = useSelection(minerals.map(item_ => item_.id));
  const selectedIds = selected.filter(item => item.hovered || item.clicked).map(item => item.id);

  return (
    <div className="grid grid-cols-8 px-2">
      <div className="prop col-span-5 grid grid-cols-4 gap-2 text-sm">
        {SECTION_FIELDS[contextKey].map((key, index) => {
          if (FIELDS.hasOwnProperty(key) === false || !items[key]) return null;
          let field = FIELDS[key];

          let _isHovered = selectedIds.length && !items[key].some(item => item.ids.some(id => selectedIds.includes(id)));
          let hoverClass = 'transition-opacity duration-300 ease-in-out';
          let _isCollapsed;
          if (typeof field.isCollapsed === 'function') _isCollapsed = field.isCollapsed(false);
          else _isCollapsed = field.isCollapsed;

          let component = null;
          if (key === 'color' || key === 'streak') component = <ColorEntities items={items[key]} minerals={minerals} selected={selectedIds} hoverClass={hoverClass} />;

          return (
            <Fragment key={index}>
              <div className="flex flex-col p-2 h-auto">
                <span className={cx("prop-title", hoverClass, _isHovered ? 'opacity-20' : '')}>{field.title}</span>
                {field.subtitle && (<span className={cx("my-2 prop-subtitle", hoverClass, _isHovered ? 'opacity-20' : '')}>{field.subtitle}</span>)}
              </div>
              {component || (
                  <div className="col-span-3 flex flex-col space-y-2">
                    {Array.isArray(items[key]) ?
                      items[key].map((item, index) => {
                        let _isHovered = selectedIds.length && !item.ids.some(id => selectedIds.includes(id));
                        return (
                          <div key={index} className="flex items-center">
                            <div className="flex flex-none w-[1.5rem]">
                              {item.ids.map((id) => {
                                let _isHovered = selectedIds.length && !selectedIds.includes(id);
                                let _color = minerals.find(mineral => mineral.id === id)?.color;

                                return (
                                  <Dot key={id} color={_color} isHovered={_isHovered} />
                                )}
                              )}
                            </div>
                            <span className={cx('prop item', hoverClass, _isHovered ? 'opacity-20' : '')} dangerouslySetInnerHTML={{ __html: item.value }}></span>
                          </div>
                        )
                      }) : (<span className="prop-item">{items[key]}</span>)}
                  </div>)
              }
            </Fragment>
          )}
        )}
      </div>

      <aside className="col-start-8 flex flex-col gap-2">
        {minerals.map((item, index) => {
          let isHighlighted = selected.find(_item => _item.id === item.id);

          return (
            <div key={index} className="flex items-center justify-start">
              <div className="w-2 h-2 mr-2 rounded-full flex-none" style={{ backgroundColor: item.color }}></div>
              <RelationChip name={item.name}
                            statuses={item.statuses}
                            className="flex-none"
                            hasArrow={false}
                            hasClose={isHighlighted && isHighlighted.clicked}
                            onMouseEnter={() => { handleSelection(item.id, true) }}
                            onMouseLeave={() => { handleSelection(item.id, false) }}
                            onClick={() => { handleSelection(item.id, false, true)  }}
                            onClose={(e) => { e.stopPropagation(); handleSelection(item.id, false, false, true) }}
                            type={isHighlighted && isHighlighted.clicked ? 'highlighted' : null}  />
            </div>)
        })}
      </aside>
    </div>
  )
};

const Collapse = ({ isCollapsed, onClick }) => {
  return (
    <div className="flex items-center justify-center w-20 h-6 bg-blue-200 border border-blue-500 rounded-sm cursor-pointer" onClick={onClick}>
      <span className="text-xs font-semibold text-font-blueDark flex-nowrap">{ isCollapsed ? 'Show more' : 'Show less' }</span>
    </div>
  )
};


const Field = ({ field, isCollapsable, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsable ? true : false);

  return (
    <Fragment>
      <div className="flex flex-col p-2 h-auto">
        <span className="prop-title">{field.title}</span>
        {field.subtitle && (<span className="prop-subtitle my-2">{field.subtitle}</span>)}
      </div>
      <div className="col-span-4 p-2 h-auto">
        {children}
        {isCollapsable && (
          <div>
            <Collapse isCollapsed={isCollapsed} onClick={() => { setIsCollapsed(!isCollapsed) }} />
          </div>
        )}
      </div>
    </Fragment>
  )
}

const GroupedDataContext = ({ contextKey, data }) => {

  console.log(contextKey, data)
  // TODO: make it work with multiple contexts

  const hardness = data.hardness ? [
    ...data.hardness.min.map(item => { return { key: 'min', value: item }}),
    ...data.hardness.max.map(item => { return { key: 'max', value: item }})
  ] : [];

  const refs = useRef([]);
  console.log('REFS:', refs)

  return (
    <div className="prop grid grid-cols-8 px-2">
      <div  className="col-span-8 grid grid-cols-5 gap-2 space-y-1 text-sm">
        {SECTION_FIELDS[contextKey].map((key, index) => {
          if (FIELDS.hasOwnProperty(key) === false || !data[key]) return null;
          let field = FIELDS[key];

          // TODO: currently doesn't work if we are rendering a component
          let isCollapsable : boolean, _isCollapsed : boolean;
          if (typeof field.isCollapsed === 'function') isCollapsable = field.isCollapsed(true);
          else isCollapsable = field.isCollapsed;
          // used to control the state of the Collapse component
          _isCollapsed = isCollapsable;
          console.log(_isCollapsed)

          let component = null;
          if (key === 'color' || key === 'streak') component = <GroupedColorEntities items={data[key]} />;
          else if (key === 'hardness') {
            let _domainX = [];
            for (let i = 0; i <= 10; i += 0.5) _domainX.push(i);
            component = <CellChart items={hardness} labelX="Hardness" domainX={_domainX} domainY={["max", "min"]} />
          };

          return (
            <Field key={index} {...{ field, isCollapsable}}>
              {component || (
                (<div ref={ref => refs[key] = ref} className={cx("flex flex-col space-y-2", _isCollapsed ? "line-clamp-5" : "line-clamp-none")}>
                  {Array.isArray(data[key]) ? (
                    <ul className="flex flex-col flex-wrap relative gap-1 list-none text-xs text-font-secondary font-medium">
                      {data[key].map((item, index) => {
                        return (
                          <li key={index} className="flex items-center relative">
                            <span className="flex items-center bg-white border px-1 py-0.5 rounded">
                              {item.key}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                              </svg>
                              {item.value}
                            </span>
                          </li>
                        )}
                      )}
                    </ul>
                  ) : (<span className="prop-item">{data[key]}</span>)}
                </div>)
              )}
            </Field>
          )}
        )}
      </div>
    </div>
  )
};


const ContextController = ({ isGrouping = false, context }) => {
  console.log(context)
  if (isGrouping) return <GroupedDataContext {...context} />;
  return <MineralDataContext {...context} />;
};

ColorEntities.defaultProps = colorEntitiesDefaultProps;
GroupedColorEntities.defaultProps = groupedColorEntitiesDefaultProps;
MineralDataContext.defaultProps = mineralContextDefaultProps;
export { ContextController };
