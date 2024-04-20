import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { adminlogout } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

function AdminNav() {

    const Navigate = useNavigate()
    const handlelogout = async () =>{
        let res = await adminlogout()

        if(res.status === 200){
            localStorage.clear('admin_token')
            Navigate('/adminlogin')
        }
    }
    
    return (
        <Card className="h-screen max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-custom-color">
            <div className="mb-2 p-4">
                <Typography className='text-3xl' variant="h5" color="blue-gray">
                    Paintcont
                </Typography>
            </div>
            <List>
                <ListItem className='m-1'>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem className='m-2'>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Users   
                </ListItem>
                <ListItem className='m-2'>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Painters
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                <ListItem className='m-2'>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Hashtags
                </ListItem>
                <ListItem className='m-2'>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Subscriptions
                </ListItem >
                <ListItem className='m-2' onClick={handlelogout}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}

export default AdminNav;