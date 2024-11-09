export const is_child_inside_parent = (child: HTMLElement, parent: HTMLElement): boolean => {
    const childRect = child.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
  
    return (
      childRect.left - childRect.width >= parentRect.left 
    );
  }