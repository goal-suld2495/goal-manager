import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material';
import * as React from 'react';

const defaultValue = {};
const MessageContext = React.createContext(defaultValue);

type MessageType = React.ForwardRefExoticComponent<{
  children: string;
} & React.RefAttributes<HTMLDivElement>>;

interface MessageBoxComposition {
  Warning: MessageType;
  Success: MessageType;
  Error: MessageType;
}

interface MessageBoxProps {
  children: React.ReactElement;
  open?: boolean;
  onClose?: SnackbarProps['onClose']
}

const AlertComonent = (type: AlertColor) => React.forwardRef<HTMLDivElement, { children: string }>(
  ({ children }, ref) => {
    return <Alert severity={type} ref={ref}>{children}</Alert>;
  });

const MessageBox: React.FC<MessageBoxProps> & MessageBoxComposition = (
  { children, open, onClose }
) => {
  return (
    <MessageContext.Provider value={defaultValue}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
        open={open}
        onClose={onClose}
      >
        {children}
      </Snackbar>
    </MessageContext.Provider>
  );
};

MessageBox.Warning = AlertComonent('warning');
MessageBox.Success = AlertComonent('success');
MessageBox.Error = AlertComonent('error');

export default MessageBox;
