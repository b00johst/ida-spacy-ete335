export const randomId = () => 
{
    return Math.floor(Math.random() * 4096) + 1
}

export const hasChildren = (element) => {
    if(element !== undefined 
        && element.props !== undefined 
        && element.props.children !== undefined 
        && element.props.children.length !== 0) 
        {
            return true;
        }
    
    return false;
}


export const findChild = (child, target) => {
    if((child.type.tag === target || child.type.tag === target)) {
        return child;
    }

    const item = child.props.children.find((element) => {
        if(element.type) {
            const found = (element.type.tag === target ||  element.type.tag === target)
            return found;
        }

        
        return false;
    });

    return item;
}