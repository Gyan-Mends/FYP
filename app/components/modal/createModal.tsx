import React, { ReactNode } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from "@nextui-org/react";

interface CreateModalProps {
  children: (onClose: () => void) => ReactNode;
  modalTitle: string;
  className?:string;
  isOpen: boolean,
  onOpenChange: () => void
}

export default function CreateModal({ children, modalTitle,onOpenChange,className, isOpen }: CreateModalProps) {
    
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className={className}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
              <ModalBody>
                {children(onClose)}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
