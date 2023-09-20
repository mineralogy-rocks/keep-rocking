import Dot from "@/components/Dot";
import ColorChip from "@/components/ColorChip/ColorChip";
import cx from "clsx";


interface Props {
  items: any,
  minerals: any,
  selected: any,
  hoverClass?: string,
};

const defaultProps = {
  items: [],
  minerals: [],
  selected: [],
  hoverClass: "",
};


const ColorEntities = ({ items, minerals, selected, hoverClass, ...props } : Props & typeof defaultProps) => {

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


const GroupedColorEntities = ({ items, ...props } : Props & typeof defaultProps) => {


  return (
    <div className="col-span-3 flex flex-col flex-wrap gap-2">
      {items.map((item, index) => {

          return (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                <div className="flex w-4 mr-2">
                  {item.ids.map((id) => {
                    return (
                      <Dot key={id} />
                    )}
                  )}
                </div>
              </div>
              {/*<ul className="flex flex-wrap mt-1 relative ml-2 list-none text-xs text-font-secondary">*/}
              {/*  {item.children.map((child, index) => {*/}
              {/*    return (*/}
              {/*    <li key={index} className="ml-2 flex items-center relative pb-2">*/}
              {/*      <div className="flex">*/}
              {/*        {child.ids.map((id) => {*/}
              {/*          return (*/}
              {/*            <Dot key={id} size='small' color={_getColor(id)} isHovered={_isHovered(id)} />*/}
              {/*          )}*/}
              {/*        )}*/}
              {/*      </div>*/}
              {/*      <span className={cx("ml-2", hoverClass, _isHovered(child.ids) ? 'opacity-20' : '')}>{child.value}</span>*/}
              {/*    </li>*/}
              {/*  )}*/}
              {/*  )}*/}
              {/*</ul>*/}
            </div>
          )}
      )}
    </div>
  )
}

ColorEntities.defaultProps = defaultProps
GroupedColorEntities.defaultProps = defaultProps
export { ColorEntities, GroupedColorEntities }
