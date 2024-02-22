import React from 'react';
import {FcBullish} from "react-icons/fc";
import {DASHBOARD_SIDEBAR_LINKS} from "../../lib/consts";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";
import {text} from "@fortawesome/fontawesome-svg-core";

const linkClasses =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'


const Sidebar = () => {
    return (
        <div className="flex flex-col bg-neutral-900 w-60 p-3">
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24}/>
                <span className='text-neutral-100 text-lg'>Money Lover</span>
            </div>
            <div className='flex-1'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.index} item={item}/>
                ))}
            </div>
            <div>bottom part</div>
        </div>
    );
};

export default Sidebar;

function SidebarLink({item}) {

    const {pathname} = useLocation();

    return (
        <Link to={item.path}
              className={classNames(
                  pathname === item.path ?
                      'text-blue-400' :
                      'text-white',linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}


