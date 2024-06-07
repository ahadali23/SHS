import React from "react";
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Mail,
  Assignment,
  Notifications,
  ArrowForward,
} from "@mui/icons-material";

const notifications = [
  {
    id: 1,
    icon: <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />,
    name: "Dr sultads",
    text: "Send you Photo",
    date: "29 July 2020",
    time: "02:26 PM",
  },
  {
    id: 2,
    icon: <Avatar>KG</Avatar>,
    name: "KG",
    text: "Resport created successfully",
    date: "29 July 2020",
    time: "02:26 PM",
  },
  {
    id: 3,
    icon: <Avatar>H</Avatar>,
    name: "Reminder",
    text: "Treatment Time!",
    date: "29 July 2020",
    time: "02:26 PM",
  },
  {
    id: 4,
    icon: <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />,
    name: "Dr sultads",
    text: "Send you Photo",
    date: "29 July 2020",
    time: "02:26 PM",
  },
  {
    id: 5,
    icon: <Avatar>KG</Avatar>,
    name: "KG",
    text: "Resport created successfully",
    date: "29 July 2020",
    time: "02:26 PM",
  },
];

const NotificationPopover = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ alignItems: "flex-start" }}>
              <ListItemIcon>{notification.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {notification.name}{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {notification.text}
                    </Typography>
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {notification.date} - {notification.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            See all notifications <ArrowForward fontSize="small" />
          </Typography>
        </Box>
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
