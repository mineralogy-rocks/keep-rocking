import { styled } from '@linaria/react';
import cx from 'clsx';

import RelationChip from "@/components/RelationChip";


interface mineral {
  id: string;
  name: string;
  slug : string;
  description: string;
  url: string;
  statuses: [number];
  is_main: boolean;
  is_current: boolean;
};

interface Props {
  item: mineral | null,
  mineralScope: mineral[],
  relations: {
      id: string;
      mineral: string;
      relation: string;
    }[];
};

const defaultProps = {
  item: null,
  mineralScope: [],
  relations: [],
};

const getRelations = (relations : Props['relations'], id: string) => {
  return relations.filter(item => item.relation === id);
}

const RelationTree: React.FC<Props> = (props) => {
  const { item, relations , mineralScope } = { ...defaultProps, ...props};

  if (!item) return null;
  let localProp = item.is_main ? {} : { description: item.description } ;

  return (
    <Wrapper>
      <div className={cx("flex mt-0.5")}>
        <RelationChip name={item.name} statuses={item.statuses} hasArrow={false} isHighlighted={item.is_current} {...localProp} />
      </div>

      <div className={cx("tree relative flex flex-col ml-6 h-full")}>

        {getRelations(relations, item.id).map(relation => {
          const match = mineralScope.find(i => i.id === relation.mineral);
          if (!match) return null;

          return (
            <div key={match.id} className={cx(match.is_current && 'py-5 px-1')}>
              {getRelations(relations, match.id).length ?
                <RelationTree item={match} mineralScope={mineralScope} relations={relations}/> : (
                  <div className="flex mt-0.5" key={match.id}>
                    <RelationChip hasArrow={false}
                                  isHighlighted={match.is_current}
                                  name={match.name}
                                  statuses={match.statuses}
                                  description={match.description}/>
                  </div>
                )}
            </div>
          )
        })
        }
        <style jsx>{`
          .tree::before {
            content: '';
            position: absolute;
            top: 0;
            left: 10px;
            width: 1px;
            height: 100%;
            background: #9ca3af;
            z-index: -1;
          }
        `}</style>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``;

export {RelationTree, Wrapper};
