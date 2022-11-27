import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { theme } from '../../common/Theme';
import { Diet } from './Diet';
import { MedicalInformation } from './MedicalInformation';
import { FitnessCenter } from './FitnessCenter';
import { Stats } from './Stats';
import { ControlCameraTwoTone } from '@material-ui/icons';

const drawerWidth = 240;

const feature_icon_mapping = {
    "Dashboard": <DashboardIcon />,
    "Monitor Stats": <AnalyticsIcon />,
    "Fitness Center": <FitnessCenterIcon />,
    "Diet": <FastfoodIcon />,
    "Medical Information": <MedicalInformationIcon />,
}


export default function Sidebar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {Object.entries(feature_icon_mapping).map(([key, value]) => (
                            <ListItem key={key} sx={{ flexGrow: 1 }}>
                                <Link className="nav-link" to={"/" + key} color={theme.palette.primary}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {value}
                                        </ListItemIcon>
                                        <ListItemText primary={key} />

                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer >
        </Box >
    );
}