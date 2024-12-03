import { memo } from 'react';

import { styled } from '@linaria/react';
import cx from 'clsx';

import { useRelationTreeContext } from "./RelationTreeContext";
import RelationChip from "@/components/RelationChip";

import { relation, Props } from "@/components/RelationTree/interfaces";


const defaultProps = {
  item: null,
};

const getRelations = (relations: relation[], id: string) => {
  return relations.filter(item => item.relation === id);
}

const RelationTree: React.FC<Props> = (props) => {
  const { item } = { ...defaultProps, ...props};
  const { mineralScope, relations } = useRelationTreeContext();

  if (!item) return null;

  return (
    <Wrapper>
      <div className="flex mt-0.5">
        <RelationChip name={item.name} slug={item.slug} statuses={item.statuses} hasLink={true} hasArrow={false} isHighlighted={item.is_current} {...{ description: item.is_main ? null : item.description }} />
      </div>

      <div className={cx("tree relative flex flex-col ml-6 h-full")}>

        {getRelations(relations, item.id).map(relation => {
          const match = mineralScope.find(i => i.id === relation.mineral);
          if (!match) return null;

          return (
            <div key={match.id} className={cx(match.is_current && 'py-5 px-1')}>
              {getRelations(relations, match.id).length ?
                <RelationTree item={match} /> : (
                  <div className="flex mt-0.5" key={match.id}>
                    <RelationChip hasArrow={false}
                                  hasLink={true}
                                  slug={match.slug}
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

export const Wrapper = styled.div``;

export default memo(RelationTree);
