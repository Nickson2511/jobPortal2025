import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    cursor: "pointer",
  },
  navButton: {
    marginLeft: theme.spacing(1),
  },
  drawerPaper: {
    width: 240,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (location) => {
    history.push(location);
    setDrawerOpen(false); 
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderButtons = () => {
    if (isAuth()) {
      if (userType() === "recruiter") {
        return [
          { text: "Home", path: "/home" },
          { text: "Add Jobs", path: "/addjob" },
          { text: "My Jobs", path: "/myjobs" },
          { text: "Employees", path: "/employees" },
          { text: "Profile", path: "/profile" },
          { text: "Logout", path: "/logout" },
        ];
      } else {
        return [
          { text: "Home", path: "/home" },
          { text: "Applications", path: "/applications" },
          { text: "Profile", path: "/profile" },
          { text: "Logout", path: "/logout" },
        ];
      }
    } else {
      return [
        { text: "Login", path: "/login" },
        { text: "Signup", path: "/signup" },
      ];
    }
  };

  const navItems = renderButtons();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => handleClick("/")}
          >
            Job Portal
          </Typography>
          {!isMobile &&
            navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                className={classes.navButton}
                onClick={() => handleClick(item.path)}
              >
                {item.text}
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleClick(item.path)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;







// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   makeStyles,
// } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

// import isAuth, { userType } from "../lib/isAuth";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Navbar = (props) => {
//   const classes = useStyles();
//   let history = useHistory();

//   const handleClick = (location) => {
//     console.log(location);
//     history.push(location);
//   };

//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Typography variant="h6" className={classes.title}>
//           Job Portal
//         </Typography>
//         {isAuth() ? (
//           userType() === "recruiter" ? (
//             <>
//               <Button color="inherit" onClick={() => handleClick("/home")}>
//                 Home
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/addjob")}>
//                 Add Jobs
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/myjobs")}>
//                 My Jobs
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/employees")}>
//                 Employees
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/profile")}>
//                 Profile
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/logout")}>
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button color="inherit" onClick={() => handleClick("/home")}>
//                 Home
//               </Button>
//               <Button
//                 color="inherit"
//                 onClick={() => handleClick("/applications")}
//               >
//                 Applications
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/profile")}>
//                 Profile
//               </Button>
//               <Button color="inherit" onClick={() => handleClick("/logout")}>
//                 Logout
//               </Button>
//             </>
//           )
//         ) : (
//           <>
//             <Button color="inherit" onClick={() => handleClick("/login")}>
//               Login
//             </Button>
//             <Button color="inherit" onClick={() => handleClick("/signup")}>
//               Signup
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
