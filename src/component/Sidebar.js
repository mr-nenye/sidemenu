import React from "react";

const SidebarItem = ({
  label,
  subItems,
  depthStep = 10,
  depth = 0,
  ...rest
}) => {
  return (
    <>
      <li className="menuItem" {...rest}>
        <span className="menuText" style={{ paddingLeft: depth * depthStep }}>
          {label}
        </span>
      </li>
      {Array.isArray(subItems) ? (
        <ul className="sidemenu">
          {subItems.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
            // <li className="menuItem" key={subItem.name}>
            //   <span className="menuText">{subItem.label}</span>
            // </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

const Sidebar = ({ menuItems, depthStep, depth }) => {
  return (
    <div className="sidebar">
      <ul className="sidemenu">
        {menuItems.map((sidebarItem, index) => (
          <SidebarItem
            key={`${sidebarItem.name}${index}`}
            depthStep={depthStep}
            depth={depth}
            {...sidebarItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
