import { Button, Input, Select, SelectItem, TableCell, TableRow, Textarea, User } from "@nextui-org/react"
import { ActionFunction, LoaderFunction } from "@remix-run/node"
import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { LocationIcon } from "~/components/icons/LocationIcon"
import { MailIcon } from "~/components/icons/MailIcon"
import PlusIcon from "~/components/icons/PlusIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import UserIcon from "~/components/icons/UserIcon"
import EditModal from "~/components/modal/EditModal"
import ConfirmModal from "~/components/modal/confirmModal"
import CreateModal from "~/components/modal/createModal"
import ViewModal from "~/components/modal/viewModal"
import { TicketColumns } from "~/components/table/columns"
import CustomTable from "~/components/table/table"
import { errorToast, successToast } from "~/components/toast"
import ticketController from "~/controllers/ticketController"
import { TicketInterface } from "~/interfaces/interface"
import UserLayout from "~/layout/userLayout"

const Ticket = () => {
    const { user, staffTickets } = useLoaderData<{ user: { _id: string }, staffTickets: TicketInterface[] }>();
    const [base64Image, setBase64Image] = useState();
    const actionData = useActionData<any>()
    const [rowsPerPage, setRowsPerPage] = useState(11)
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<TicketInterface>()
    const [isViewModalOpened, setIsViewModalOpened] = useState(false)
    const submit = useSubmit()

    const handleViewModalClosed = () => {
        setIsViewModalOpened(false)
    }
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData])
    const priorities = [
        { name: "Low" },
        { name: "Medium" },
        { name: "High" },

    ]

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };


    return (
        <UserLayout pageName="Tickets">
            <Toaster position="top-center" />
            <div className="flex z-0 justify-between gap-2">
                <div>
                    <Input
                        placeholder="Search product..."
                        startContent={<SearchIcon className="" />}
                        classNames={{
                            inputWrapper: "h-14 lg:w-80",
                        }}
                    />
                </div>
                <div>
                    <Link to="/admin">
                        <Button color="primary" variant="flat" className="h-12 font-poppins text-sm">
                            <PlusIcon className="h-6 w-6" />Back
                        </Button>
                    </Link>

                </div>
            </div>

            <CustomTable columns={TicketColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                {staffTickets.map((ticket: TicketInterface, index: number) => (
                    <TableRow className="text- " key={index}>
                        <TableCell>
                            <User
                                avatarProps={{ radius: "lg", src: ticket.attachment }}
                                name={ticket.subject}
                            />
                        </TableCell>
                        <TableCell className="">
                            {ticket.category}
                        </TableCell>
                        <TableCell>{ticket.location}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>{ticket.description}</TableCell>
                        <TableCell>{ticket.stuff.name === "Pending" ? "Staff not assigned" : ticket.stuff.name}</TableCell>
                        <TableCell><Button color="success" variant="flat">{ticket.status}</Button></TableCell>
                        <TableCell className="relative flex items-center gap-4">
                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                <button className="text-dander font-poppins text-sm" onClick={() => {
                                    setIsViewModalOpened(true)
                                    setSelectedTicket(ticket)
                                }}>
                                    View
                                </button>
                            </span>

                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>
            <ViewModal isOpen={isViewModalOpened} className="w-80" modalTitle="Ticket Creater Details" onOpenChange={handleViewModalClosed}>
                <div>
                    <img className="rounded-lg" src={selectedTicket?.user.image} alt="" />
                    <div className="mt-4 flex items-center gap-4">
                        <UserIcon className="h-6 w-6"/>
                        <p className="font-poppins text-sm">{selectedTicket?.user.name}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                        <MailIcon className="h-6 w-6 text-default-400"/>
                        <p className="font-poppins text-sm">{selectedTicket?.user.email}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                        <LocationIcon  className="h-6 w-6 text-primary"/>
                        <p className="font-poppins text-sm">{selectedTicket?.location}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 font-poppins">
                    <Button color="danger" variant="flat" onPress={handleViewModalClosed}>
                        Close
                    </Button>
                </div>

            </ViewModal>
        </UserLayout>
    )
}

export default Ticket



export const loader: LoaderFunction = async (request) => {
    const { user, staffTickets } = await ticketController.GetTickets(request);

    return { user, staffTickets }
}