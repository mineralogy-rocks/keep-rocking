import { createContext, useContext, useMemo } from 'react';

import useSelection from './useSelection.hook';


interface SelectionContextType {
  selection: Array<{
    id: string | number;
    hovered: boolean;
    clicked: boolean;
  }>;
  activeSelection: Array<{
    id: string | number;
    hovered: boolean;
    clicked: boolean;
  }>;
  handleSelection: (id: string, hovered: boolean, clicked?: boolean, clear?: boolean) => void;
}

interface SelectionProviderProps {
  items: Array<{ id: string | number }>;
  children: React.ReactNode;
}

const SelectionContext = createContext<SelectionContextType | null>(null);

const SelectionProvider: React.FC<SelectionProviderProps> = ({
  items,
  children
}) => {
  const [selection, handleSelection] = useSelection(items);
  const activeSelection = useMemo(() => selection.filter((item) => item.hovered || item.clicked), [selection]);

  const value = useMemo(() => ({
    selection,
    activeSelection,
    handleSelection,
  }), [selection, activeSelection, handleSelection]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};

const useSelectionContext = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelectionContext must be used within a SelectionProvider');
  }
  return context;
};

export { SelectionProvider, useSelectionContext };
