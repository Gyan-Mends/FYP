
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { ReactNode } from "react";

interface DeleteModalProps{
    isOpen: boolean,
    onOpenChange: () => void,
    children:ReactNode
    modalbody:ReactNode
}
export default function ConfirmModal({isOpen,onOpenChange,children,modalbody}: DeleteModalProps) {

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center gap-1 font-poppins text-2xl text-danger">Confirm Delete</ModalHeader>
              <ModalBody className="flex items-center justify-center">
                <p className="font-poppins">{modalbody}</p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                {children}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
