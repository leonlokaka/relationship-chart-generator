import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext, useEffect } from "react";
import { GlobalReducerActionType, GlobalReducerContext } from "../reducer/GlobalRecuder";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface IGlobalDialogArgs {
  open: boolean;
  title: any;
  content?: any;
  actions?: any;
  handleClose: () => void;
}

function GlobalDialog({ state }: any) {
  const reducer = useContext(GlobalReducerContext);

  const triggerClose = () => {
    reducer.dispatch({
      type: GlobalReducerActionType.UpdateGlobalDialog,
      payload: {
        globalDialog: { open: false },
      },
    });
    reducer.state.globalDialog.handleClose();
  };

  return (
    <> 
        <Dialog
          open={reducer.state.globalDialog.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={triggerClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{reducer.state.globalDialog.title}</DialogTitle>
          <DialogContent>
              {reducer.state.globalDialog.content}
          </DialogContent>
          <DialogActions>
            {reducer.state.globalDialog.actions}
            {!reducer.state.globalDialog.actions && (
              <Button onClick={triggerClose}>Close</Button>
            )}
          </DialogActions>
        </Dialog> 
    </>
  );
}

export type { IGlobalDialogArgs };
export { GlobalDialog };
