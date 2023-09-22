import Dot from "@/components/Dot";
import ColorChip from "@/components/ColorChip/ColorChip";
import cx from "clsx";
import useSelection from "@/hooks/use-selection.hook";
import { PHYSICAL_PROPS_TITLES } from "@/lib/constants";
import { Fragment } from "react";
import RelationChip from "@/components/RelationChip";
import DotChart from "@/components/DotChart";


interface ColorEntitiesProps {
  items: any,
  minerals: any,
  selected: any,
  hoverClass?: string,
};

interface GroupedColorEntitiesProps {
  items: any,
};

const ColorEntitiesDefaultProps = {
  items: [],
  minerals: [],
  selected: [],
  hoverClass: "",
};

const GroupedColorEntitiesDefaultProps = {
  items: [],
};


const ColorEntities = ({ items, minerals, selected, hoverClass, ...props } : ColorEntitiesProps & typeof ColorEntitiesDefaultProps) => {

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


const GroupedColorEntities = ({ items, ...props } : GroupedColorEntitiesProps & typeof GroupedColorEntitiesDefaultProps) => {


  return (
    <div className="col-span-3 flex flex-col flex-wrap gap-2 divide-y">
      {items.map((item, index) => {

          return (
            <div key={index} className="flex items-center">
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

const MineralDataContext = ({ contexts = {} }) => {

  // TODO: make it work with multiple contexts
  const data = contexts['Physical properties'];
  const [selected, handleSelection] = useSelection(data.minerals.map(item_ => item_.id));
  const selectedIds = selected.filter(item => item.hovered || item.clicked).map(item => item.id);

  return (
    <div className="grid grid-cols-8 px-2">
      <div className="col-span-5 grid grid-cols-4 gap-2 text-sm">
        {Object.keys(PHYSICAL_PROPS_TITLES).map((key, index) => {
          if (data.items.hasOwnProperty(key) === false) return null;
          const [title, subtitle] = PHYSICAL_PROPS_TITLES[key] || [key, null];
          let _isHovered = selectedIds.length && !data.items[key].some(item => item.ids.some(id => selectedIds.includes(id)));
          let hoverClass = 'transition-opacity duration-300 ease-in-out';

          return (
            <Fragment key={index}>
              <div className="flex flex-col">
                <span className={cx("font-semibold break-words", hoverClass, _isHovered ? 'opacity-20' : '')}>{title}</span>
                {subtitle && (<span className={cx("my-2 font-normal leading-normal break-words text-xxs", hoverClass, _isHovered ? 'opacity-20' : '')}>{subtitle}</span>)}
              </div>
              {key === 'color' || key === 'streak' ? (
                <ColorEntities items={data.items[key]} minerals={data.minerals} selected={selectedIds} hoverClass={hoverClass} />
              ) : (
                  <div className="col-span-3 flex flex-col space-y-2">
                    {data.items[key].map((item, index) => {
                      let _isHovered = selectedIds.length && !item.ids.some(id => selectedIds.includes(id));
                        return (
                          <div key={index} className="flex items-center">
                            <div className="flex flex-none w-[1.5rem]">
                              {item.ids.map((id) => {
                                let _isHovered = selectedIds.length && !selectedIds.includes(id);
                                let _color = data.minerals.find(mineral => mineral.id === id)?.color;

                                return (
                                  <Dot key={id} color={_color} isHovered={_isHovered} />
                                )}
                              )}
                            </div>
                            <span className={cx(hoverClass, _isHovered ? 'opacity-20' : '')} dangerouslySetInnerHTML={{ __html: item.value }}></span>
                          </div>
                        )}
                    )}
                  </div>)
              }
            </Fragment>
          )}
        )}
      </div>

      <aside className="col-start-8 flex flex-col gap-2">
        {data.minerals.map((item, index) => {
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

const GroupedDataContext = ({ contexts = {} }) => {

  // TODO: make it work with multiple contexts
  const data = contexts[0].data;

  const hardness = data.hardness ? [
    ...data.hardness.min.map(item => { return { key: 'min', value: item }}),
    ...data.hardness.max.map(item => { return { key: 'max', value: item }})
  ] : [];

  return (
    <div className="grid grid-cols-8 px-2">
      <div className="col-span-8 grid grid-cols-5 gap-2 text-sm">
        {Object.keys(PHYSICAL_PROPS_TITLES).map((key, index) => {
          if (data.hasOwnProperty(key) === false) return null;
          const [title, subtitle] = PHYSICAL_PROPS_TITLES[key] || [key, null];

          return (
            <Fragment key={index}>
              <div className="flex flex-col">
                <span className="font-semibold break-words">{title}</span>
                {subtitle && (<span className="my-2 font-normal leading-normal break-words text-xxs">{subtitle}</span>)}
              </div>
              <div className="col-span-4">
                {key === 'color' || key === 'streak' ? (
                  <GroupedColorEntities items={data[key]} />
                ) : key == 'hardness' ? (
                    <DotChart items={hardness} labelX="Hardness" />
                ) : (
                    <div className="flex flex-col space-y-2">
                      {Array.isArray(data[key]) ? (
                        data[key].map((item, index) => {
                          return (
                            <div key={index} className="flex items-center">
                              {item.key} - {item.value}
                            </div>
                          )}
                        )
                      ) : (<div>{data[key]}</div>)}
                    </div>)
                }
              </div>
            </Fragment>
          )}
        )}
      </div>
    </div>
  )
};

const DataContext = ({ isGrouping = false, ...props }) => {
  if (isGrouping) return <GroupedDataContext {...props} />;
  return <MineralDataContext {...props} />;
}

ColorEntities.defaultProps = ColorEntitiesDefaultProps;
GroupedColorEntities.defaultProps = GroupedColorEntitiesDefaultProps;
export { DataContext };
