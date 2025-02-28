import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';
import Box from '@mui/material/Box';

export default function BottomSheet({ isOpen, onClose, children }) {
  return (
    // <Box>
      <Sheet isOpen={isOpen} onClose={onClose}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
          <h2 className="text-lg font-bold">""</h2>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    // </Box>
  );
}