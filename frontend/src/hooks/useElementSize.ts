export const useElementSize = () => {
  const getElWidth = (elRef: React.RefObject<HTMLDivElement>) => {
    let finalWidth = 0;
    Array.from(elRef.current.children).forEach(child => {
      finalWidth += child.clientWidth;
    });
    return finalWidth;
  };

  const getElHeight = (elRef: React.RefObject<HTMLDivElement>) => {
    let finalHeight = 0;
    Array.from(elRef.current.children).forEach(child => {
      finalHeight += child.clientHeight;
    });
    return finalHeight;
  };

  return { getElHeight, getElWidth };
};
