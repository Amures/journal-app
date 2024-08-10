import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';


export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {


    const dispatch = useDispatch();
    const onClickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}));
    }

    const newTitle = useMemo( () => {
        return title.length > 17
        ? title.slice(0, 17) + '...'
        : title;
    },[title])  
  return (
    <ListItem 
        key={ id} 
        disablePadding
        onClick={onClickNote}
    >
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
