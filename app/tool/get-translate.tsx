export const get_translate_y = (element: HTMLElement): number => {
    const style = window.getComputedStyle(element);
    const matrix = style.transform;
  
    if (matrix && matrix !== "none") {
      const values = matrix.match(/matrix.*\((.+)\)/)?.[1].split(", ");
      const translateY = values ? parseFloat(values[5]) : 0; 
      return translateY;
    }
  
    return 0;
  }