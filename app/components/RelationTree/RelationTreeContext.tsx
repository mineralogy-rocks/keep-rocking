import { createContext, useContext, useMemo } from 'react';

import { mineral } from '@/components/RelationTree/interfaces';

interface ContextType {
  mineralScope: Array<mineral>;
  relations: Array<{ id: number, relation: string; mineral: string }>;
}

interface ProviderProps {
  mineralScope: Array<mineral>;
  relations: Array<{ id: number, relation: string; mineral: string }>;
  children: React.ReactNode;
}

const RelationTreeContext = createContext<ContextType | null>(null);

const RelationTreeProvider: React.FC<ProviderProps> = ({ mineralScope, relations, children }) => {
  const value = useMemo(
    () => ({
      mineralScope,
      relations,
    }),
    [mineralScope, relations]
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
