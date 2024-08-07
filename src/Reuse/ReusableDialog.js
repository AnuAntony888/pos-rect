// ReusableDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ReusableDialog = ({ open, onClose, title, children, actions }) => {
  return (
    <Dialog open={open} onClose={onClose}>
  
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions}

      </DialogActions>
    </Dialog>
  );
};

export default ReusableDialog;
