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
import React, { useCallback, useContext, useEffect } from "react";
import {
  GlobalReducerActionType,
  GlobalReducerContext,
} from "../reducer/GlobalRecuder";

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
  showCloseBtn?: boolean;
  handleClose: () => void;
}

const defaultGlobalDialogValue = {
  open: false,
  title: "",
  showCloseBtn: true,
  handleClose: () => {},
}

function GlobalDialog({ state }: any) {
  const reducer = useContext(GlobalReducerContext);

  const triggerClose = () => {
    reducer.dispatch({
      type: GlobalReducerActionType.UpdateGlobalDialog,
      payload: {
        globalDialog: defaultGlobalDialogValue,
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
        <DialogContent>{reducer.state.globalDialog.content}</DialogContent>
        <DialogActions>
          {reducer.state.globalDialog.actions}
          {reducer.state.globalDialog.showCloseBtn && (
            <Button onClick={triggerClose}>Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

function useGlobalDialog() {
  const { state, dispatch } = useContext(GlobalReducerContext);
  const closeDialog = useCallback(
    function closeDialog() {
      dispatch({
        type: GlobalReducerActionType.UpdateGlobalDialog,
        payload: {
          globalDialog: defaultGlobalDialogValue,
        },
      });
      state.globalDialog.handleClose();
    },
    [dispatch, state.globalDialog]
  );

  return { closeDialog };
}

export type { IGlobalDialogArgs };
export { GlobalDialog, useGlobalDialog, defaultGlobalDialogValue };
