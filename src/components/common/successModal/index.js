import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//Images such as failure, success, warning etc.
import images from "./images";

//importing images
import crossIcon from "../../../public/images/custom-color-cross.svg";

//Navigation
import { useNavigate } from "react-router-dom";


//css
import styles from "./styles.module.css";

const SuccessModal = (props) => {

    const navigate = useNavigate();

    return (
      <>
        
        <Modal
          open={true}
          // onClose={handleClose}
          aria-labelledby="modal-dialog"
          aria-describedby="modal-dialog-description"
        >
          <Box className={styles["MuiBox-root"]}>
            <div className={styles["image-section"]}>
              <img src={images.success} alt={"success"} />
            </div>
            
            <div className={styles["message-section"]}>
            <div
            className={styles["close-modal"]}
            onClick={props.onClick}
          >
            <img src={crossIcon}  alt="nomadic"/>
          </div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
                className={styles["MuiTypography-root"]}
              >
                {props.mainTitle}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                align="center"
                className={styles["MuiTypography-root"]}
              >
                {props.subTitle}
              </Typography>
              <div className={styles["button-area"]}>
                <Button className={styles["continue-button"]} onClick={navigate.bind(null, `/dashboard/`)}>
                  Continue to Dashboard
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    );

}



export default SuccessModal;