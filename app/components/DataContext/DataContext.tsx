import React from "react";
import { useState } from "react";

import Dot from "@/components/Dot";
import Collapse from "@/components/Collapse";
import ColorChip from "@/components/ColorChip";
import cx from "clsx";
import useSelection from "@/hooks/use-selection.hook";
import { SECTION_FIELDS, FIELDS } from "@/lib/constants";
import { Fragment } from "react";
import RelationChip from "@/components/RelationChip";
import CellChart from "@/components/CellChart";

import styles from "./DataContext.module.scss";


interface colorEntitiesProps {
  items: any,
  minerals: any,
  selected: any,
  hoverClass?: string,
}

const colorEntitiesDefaultProps = {
  items: [],
  minerals: [],
  selected: [],
  hoverClass: "",
}

const ColorEntities:  React.FC<colorEntitiesProps> = (props) => {
  const { items, minerals, selected, hoverClass } = { ...colorEntitiesDefaultProps, ...props};

  const _isHovered = (ids: string | string[]) => {
    if (!Array.isArray(ids)) ids = [ids];
    return selected.length > 0 && !ids.some(id => selected.includes(id));
  };

  const _getColor = (id) => {
    return minerals.find(mineral => mineral.id === id)?.color;
  }

  return (
    <div className="flex flex-col flex-wrap gap-2">
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
}

const groupedColorEntitiesDefaultProps = {
  items: [],
}

const GroupedColorEntities: React.FC<groupedColorEntitiesProps> = (props) => {
  const { items } = { ...groupedColorEntitiesDefaultProps, ...props};

  return (
    <div className="col-span-3 flex flex-col flex-wrap divide-slate-300 dark:divide-slate-400 divide-y">
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
              <ul className="flex flex-wrap relative gap-1 ml-2 list-none text-xs text-font-blueDark dark:text-font-primary font-medium">
                {item.entities.map((entity, index) => {
                  return (
                    <li key={index} className="flex items-center relative">
                      <span className="bg-white dark:bg-slate-700 px-1 py-0.5 rounded">{entity}</span>
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

const MineralDataContext: React.FC<mineralContextProps> = (props) => {
  const { contextKey, minerals, items } = { ...mineralContextDefaultProps, ...props};

  // TODO: make it work with multiple contexts and use SECTION_FIELDS
  const [selected, handleSelection] = useSelection(minerals.map(item_ => item_.id));
  const selectedIds = selected.filter(item => item.hovered || item.clicked).map(item => item.id);
  const isInteractive = minerals.length > 1;

  return (
    <div className={cx(styles.prop, "flex flex-col md:gap-2 sm:grid grid-cols-8")}>
      <div className="flex flex-col md:grid grid-cols-4 col-span-8 md:col-span-5 md:gap-2 mt-2 md:mt-0">
        {SECTION_FIELDS[contextKey].map((key, index) => {
          if (!FIELDS.hasOwnProperty(key) || !items[key]) return null;
          let field = FIELDS[key];

          let _isHovered = selectedIds.length && !items[key].some(item => item.ids.some(id => selectedIds.includes(id)));
          let hoverClass = 'transition-opacity duration-300 ease-in-out';

          // TODO: _isCollapsed is not connected yet. Connect it as we have more data.
          let _isCollapsed;
          if (typeof field.isCollapsed === 'function') _isCollapsed = field.isCollapsed(false);
          else _isCollapsed = field.isCollapsed;

          let component: React.ReactNode = null;
          if (key === 'color' || key === 'streak') component = (
            <div className="ml-2 md:ml-1 col-span-3 p-2">
              <ColorEntities items={items[key]} minerals={minerals} selected={selectedIds} hoverClass={hoverClass} />
            </div>
          );

          return (
            <Fragment key={index}>
              <div className={styles.propHeader}>
                <span className={cx(styles.propTitle, hoverClass, _isHovered ? 'opacity-20' : '')}>{field.title}</span>
                {field.subtitle && (<span className={cx(styles.propSubtitle, hoverClass, _isHovered ? 'opacity-20' : '')}>{field.subtitle}</span>)}
              </div>
              {component || (
                  <div className="ml-2 sm:ml-1 col-span-3 p-2 flex flex-col">
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
                            <span className={cx(styles.propItem, hoverClass, _isHovered ? 'opacity-20' : '')} dangerouslySetInnerHTML={{ __html: item.value }}></span>
                          </div>
                        )
                      }) : (<span className={styles.propItem}>{items[key]}</span>)}
                  </div>)
              }
            </Fragment>
          )}
        )}
      </div>

      <aside className="order-first md:order-last md:col-start-8 flex flex-col gap-2">
        {minerals.map((item, index) => {
          let isHighlighted = selected.find(_item => _item.id === item.id);
          // TODO: use the isClicked below
          let icClicked = isHighlighted?.clicked;

          return (
            <div key={index} className="flex items-center justify-start">
              <div className="w-2 h-2 mr-2 rounded-full flex-none" style={{ backgroundColor: item.color }}></div>
              <RelationChip name={item.name}
                            statuses={item.statuses}
                            className="flex-none"
                            hasArrow={false}
                            hasClose={isInteractive && isHighlighted && isHighlighted.clicked}
                            onMouseEnter={isInteractive ? () => { handleSelection(item.id, true) } : undefined}
                            onMouseLeave={isInteractive ? () => { handleSelection(item.id, false) } : undefined}
                            onClick={isInteractive ? () => { handleSelection(item.id, false, true) } : undefined}
                            onClose={isInteractive ? (e) => { e.stopPropagation(); handleSelection(item.id, false, false, true) } : undefined}
                            type={isInteractive && isHighlighted && isHighlighted.clicked ? 'highlighted' : null}  />
            </div>)
        })}
      </aside>
    </div>
  )
};

interface fieldProps {
  field: any,
  isCollapsable: boolean,
  onCollapse?: (isCollapsed: boolean) => void,
  children?: React.ReactNode,
}

const fieldDefaultProps = {
  field: {},
  isCollapsable: false,
  onCollapse: (isCollapsed) => {},
}

const Field: React.FC<fieldProps> = (props) => {
  const { field, isCollapsable, onCollapse, children } = { ...fieldDefaultProps, ...props};
  const [isCollapsed, setIsCollapsed] = useState(isCollapsable);

  const handleCollapse = (_isCollapsed) => {
    setIsCollapsed(_isCollapsed);
    onCollapse(_isCollapsed);
  };

  return (
    <Fragment>
      <div className={styles.propHeader}>
        <span className={styles.propTitle}>{field.title}</span>
        {field.subtitle && (<span className={styles.propSubtitle}>{field.subtitle}</span>)}
      </div>
      <div className="col-span-4 p-2 h-auto">
        {children}
        {isCollapsable && (
          <div className="mt-2 float-right">
            <Collapse isCollapsed={isCollapsed} onClick={() => handleCollapse(!isCollapsed)} />
          </div>
        )}
      </div>
    </Fragment>
  )
}

const GroupedDataContext = ({ contextKey, data }) => {

  // TODO: make it work with multiple contexts

  const hardness = data.hardness ? [
    ...data.hardness.min.map(item => { return { key: 'min', value: item }}),
    ...data.hardness.max.map(item => { return { key: 'max', value: item }})
  ] : [];

  const initialFieldsState: any[] = [];
  SECTION_FIELDS[contextKey].map((key, index) => {
    initialFieldsState.push({});
    if (!FIELDS.hasOwnProperty(key) || !data[key]) return;
    let field = FIELDS[key];
    let _state = {
      isCollapsed: false,
      isCollapsable: false,
    }

    let _isCollapsed;
    if (typeof field.isCollapsed === 'function') _isCollapsed = field.isCollapsed(true);
    else _isCollapsed = field.isCollapsed;

    if (_isCollapsed && data[key].split(' ').length > 50) {
      _state.isCollapsed = true;
      _state.isCollapsable = true;
    }
    initialFieldsState[index] = _state;
  });
  const [fieldsState, setFieldsState] = useState(initialFieldsState);


  return (
    <div className={cx(styles.prop, "grid grid-cols-8")}>
      <div className="col-span-8 flex flex-col md:grid grid-cols-5 gap-1 md:gap-2">
        {SECTION_FIELDS[contextKey].map((key, index) => {
          if (!FIELDS.hasOwnProperty(key) || !data[key]) return null;
          let field = FIELDS[key];

          let component: React.ReactNode = null;
          if (key === 'color' || key === 'streak') component = <GroupedColorEntities items={data[key]} />;
          else if (key === 'hardness') {
            let _domainX: string|number[] = [];
            for (let i = 0; i <= 10; i += 0.5) _domainX.push(i);
            component = <CellChart items={hardness} labelX="Hardness" domainX={_domainX} domainY={["max", "min"]} />
          }

          return (
            <Field key={index}
                   onCollapse={(isCollapsed) => {setFieldsState({...fieldsState, [index]: { ...fieldsState[index], isCollapsed: isCollapsed } })  }}
                   {...{ field, isCollapsable: fieldsState[index].isCollapsable }}>
              <div className="ml-2 sm:ml-1">
                {component || (
                  (<div className="flex flex-col space-y-2 leading-3">
                    {Array.isArray(data[key]) ? (
                      <ul className="flex flex-col flex-wrap relative gap-1 list-none text-xs text-font-blueDark dark:text-font-primary font-medium">
                        {data[key].map((item, index) => {
                          return (
                            <li key={index} className="flex items-center relative">
                              <span className="flex items-center bg-white dark:bg-slate-700 p-1 rounded">
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
                    ) : (<span className={cx(styles.propItem, fieldsState[index].isCollapsable && (fieldsState[index].isCollapsed ? "line-clamp-3" : "line-clamp-none"))}>{data[key]}</span>)}
                  </div>)
                )}
              </div>
            </Field>
          )}
        )}
      </div>
    </div>
  )
};


const ContextController = ({ isGrouping = false, context }) => {
  if (isGrouping) return <GroupedDataContext {...context} />;
  return <MineralDataContext {...context} />;
};

export { ContextController };
