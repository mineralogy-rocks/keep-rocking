import { memo } from 'react';

import { styled } from '@linaria/react';
import cx from 'clsx';

import { useRelationTreeContext } from "./RelationTreeContext";
import RelationChip from "@/components/RelationChip";

import { Relation, Props } from "@/components/RelationTree/interfaces";


const defaultProps = {
  item: null,
};


const getRelations = (relations: Relation[], id: string) => {
  return relations.filter(item => item.relation === id);
}

const RelationTree: React.FC<Props> = (props) => {
  const { item } = { ...defaultProps, ...props };
  const { mineralScope, relations, visibleIds } = useRelationTreeContext();

  if (!item) return null;

  return (
    <Wrapper>
      <div className="mt-0.5 flex">
        <RelationChip
          name={item.name}
          slug={item.slug}
          statuses={item.statuses}
          hasLink={true}
          hasArrow={false}
          isHighlighted={item.is_current}
          {...{ description: item.is_main ? null : item.description }}
        />
      </div>

      <div className={cx('tree relative ml-6 flex h-full flex-col')}>
        {getRelations(relations, item.id).map((relation) => {
          const match = mineralScope.find((i) => i.id === relation.mineral && visibleIds?.has(i.id));
          if (!match) return null;

          return (
            <div key={match.id} className={cx(match.is_current && 'px-1 py-5')}>
              {getRelations(relations, match.id).length ? (
                <RelationTree item={match} />
              ) : (
                <div className="mt-0.5 flex" key={match.id}>
                  <RelationChip
                    hasArrow={false}
                    hasLink={true}
                    slug={match.slug}
                    isHighlighted={match.is_current}
                    name={match.name}
                    statuses={match.statuses}
                    description={match.description}
                  />
                </div>
              )}
            </div>
          );
        })}
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
      {/*<div className="absolute bottom-0 left-0 h-16 w-full bg-blue-500" />*/}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  //max-height: 400px;
  //overflow: hidden;
  //position: relative;
`;

export default memo(RelationTree);
