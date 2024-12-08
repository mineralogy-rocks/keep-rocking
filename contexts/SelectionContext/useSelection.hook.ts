import { useState, useCallback } from 'react';


/**
 * Hook to manage selection state for a list of items
 * @param items - List of items with unique IDs
 * @returns Tuple of selection state and selection handler
 */
export default function useSelection(items: Array<{ id: string | number }>): any {
  const [selection, setSelected] = useState(() => items.map(item_ => {
    return {
      id: item_.id,
      hovered: false,
      clicked: false
    }
  }));

  const handleSelection = useCallback(
    (id, hovered = false, clicked = false, reset = false) => {
    setSelected((prevHighlighted) => {
      if (clicked) {
        return prevHighlighted.map((item) => (item.id === id ? { ...item, clicked: true } : item));
      } else {
        return prevHighlighted.map((item) => {
          if (item.id === id) {
            if (reset) {
              return { ...item, hovered: false, clicked: false };
            } else {
              return { ...item, hovered: hovered };
            }
          } else {
            return item;
          }
        });
      }
    });
  }, []);

  return [selection, handleSelection];
};
