import { createContext, useContext, useMemo } from 'react';

import { Mineral } from '@/components/RelationTree/interfaces';

interface ContextType {
  mineralScope: Array<Mineral>;
  relations: Array<{ id: number, relation: string; mineral: string }>;
  visibleIds: Set<string>;
}

interface ProviderProps {
  mineralScope: Array<Mineral>;
  relations: Array<{ id: number, relation: string; mineral: string }>;
  visibleIds: Set<string>;
  children: React.ReactNode;
}

const RelationTreeContext = createContext<ContextType | null>(null);

const RelationTreeProvider: React.FC<ProviderProps> = ({ mineralScope, relations, visibleIds, children }) => {
  const value = useMemo(
    () => ({
      mineralScope,
      visibleIds,
      relations,
    }),
    [mineralScope, visibleIds, relations]
  );

  return <RelationTreeContext.Provider value={value}>{children}</RelationTreeContext.Provider>;
};

const useRelationTreeContext = () => {
  const context = useContext(RelationTreeContext);
  if (!context) {
    throw new Error('useRelationTreeContext must be used within a valid Provider');
  }
  return context;
};

export { RelationTreeProvider, useRelationTreeContext };
