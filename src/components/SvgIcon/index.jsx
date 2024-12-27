import React from 'react';

function SvgIcon() {
  const size = props.size ?? "36px"
  const color = props.color ?? ""
  const profix = props.profix ?? "icon"
 
  const iconName = useMemo<string>(()=>{
    return `#${profix}-${props.name}`
  },[profix,props.name])
 
  return (
    <svg style={{height:size,width:size}}>
      <use href={iconName} fill={color} />
    </svg>
  )
}

export default SvgIcon;
