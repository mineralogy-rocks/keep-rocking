import { useState } from 'react';



export default function useSelection(items: string[]): any {
  const [selected, setSelected] = useState(items.map(item_ => {
    return {
      id: item_,
      hovered: false,
      clicked: false
    }
  }));

  const handleSelection = (id, hovered = false, clicked = false, reset = false) => {
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
  };

  return [selected, handleSelection];
};
