import { Button, Input, Select, SelectItem, TableCell, TableRow, Textarea, User } from "@nextui-org/react"
import { ActionFunction, LoaderFunction } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useSubmit } from "@remix-run/react"
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
    const { user, tickets } = useLoaderData<{ user: { _id: string }, tickets: TicketInterface[] }>();
    const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
    const [base64Image, setBase64Image] = useState();
    const actionData = useActionData<any>()
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<TicketInterface>()
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [isViewModalOpened, setIsViewModalOpened] = useState(false)
    const submit = useSubmit()

    const handleConfirModalClosed = () => {
        setIsConfirmModalOpened(false)
    }

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


    const handleCloseCreateModal = () => {
        setIsCreateModalOpened(false);
    }
    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }
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
                    <Button onClick={() => {
                        setIsCreateModalOpened(true)
                    }} color="primary" className="h-14 font-poppins text-sm">
                        <PlusIcon className="h-6 w-6" />Create Ticket
                    </Button>
                </div>
            </div>

            <CustomTable columns={TicketColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                {tickets.map((ticket: TicketInterface, index: number) => (
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
                        <TableCell>{ticket.status === "Pending" ? "No Staff Assigned" : ticket?.stuff?.name}</TableCell>
                        <TableCell><Button color="success" variant="flat">{ticket.status}</Button></TableCell>
                        <TableCell className=" flex items-center  gap-4">
                            <button className="text-dander font-poppins text-primary-400 cursor-pointer active:opacity-50 " onClick={() => {
                                ticket.status==="Pending"? (
                                <>
                                
                                </>
                            ):(
                            <>
                            {setIsViewModalOpened(true)}
                            {setSelectedTicket(ticket)}
                            </>
                            )

                            }}>
                                View
                            </button>
                            <button className="text-dander font-poppins  text-default-500" onClick={() => {
                                setIsEditModalOpened(true)
                                setSelectedTicket(ticket)
                            }}>
                                Edit
                            </button>
                            <button className="text-dander font-poppins text-danger cursor-pointer active:opacity-50" onClick={() => {
                                setIsConfirmModalOpened(true);
                                setSelectedTicket(ticket)
                            }}>
                                Delete
                            </button>
                            <button className="text-success-400 font-poppins text-danger cursor-pointer active:opacity-50" onClick={() => {
                                setIsConfirmModalOpened(true)
                                setSelectedTicket(ticket)
                            }}>
                                Complete
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>
            
            <ViewModal isOpen={isViewModalOpened} className="w-80" modalTitle="Ticket Creater Details" onOpenChange={handleViewModalClosed}>
                <div>
                    <img className="rounded-lg" src={selectedTicket?.stuff?.image} alt="" />
                    <div className="mt-4 flex items-center gap-4">
                        <UserIcon className="h-6 w-6"/>
                        <p className="font-poppins text-sm">{selectedTicket?.stuff.name}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                        <MailIcon className="h-6 w-6 text-default-400"/>
                        <p className="font-poppins text-sm">{selectedTicket?.stuff.email}</p>
                    </div>
                    
                </div>

                <div className="flex justify-end gap-2 mt-4 font-poppins">
                    <Button color="danger" variant="flat" onPress={handleViewModalClosed}>
                        Close
                    </Button>
                </div>

            </ViewModal>

            <CreateModal modalTitle="Create Tickets" className="" isOpen={isCreateModalOpened} onOpenChange={handleCloseCreateModal}>
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="Subject"
                            className="text-sm font-poppins"
                            labelPlacement="outside"
                            placeholder=" "
                            isClearable
                            name="subject"
                            isRequired
                            classNames={{
                                inputWrapper: "mt-4",
                            }}

                        />
                        <div className="flex gap-4">
                            <Input
                                className="text-sm font-poppins"
                                label="Category"
                                labelPlacement="outside"
                                placeholder=" "
                                isReadOnly
                                name="support"
                                isRequired
                                defaultValue="IT Support"
                                classNames={{
                                    inputWrapper: "mt-4",
                                }}

                            />
                            <Input
                                className="text-sm font-poppins"
                                label="Location"
                                labelPlacement="outside"
                                placeholder=" "
                                name="location"
                                isRequired
                                classNames={{
                                    inputWrapper: "mt-4",
                                }}

                            />
                        </div>

                        <div className="pt-4">
                            <Select
                                label="Priority"
                                labelPlacement="outside"
                                placeholder=" "
                                isRequired
                                className="mt-4"
                                name="priority"

                            >
                                {priorities.map((priority) => (
                                    <SelectItem textValue={priority?.name} className="mt-4" key={priority.name}>
                                        {priority?.name}
                                    </SelectItem>
                                ))}

                            </Select>
                        </div>

                        <Textarea
                            className="text-sm font-poppins"
                            label="Description(Optinal)"
                            labelPlacement="outside"
                            placeholder=" "
                            name="description"
                            classNames={{
                                inputWrapper: "",
                                label: "mt-4"
                            }}
                        />

                        <div className="pt-2 ">
                            <label className="font-poppins block text-sm" htmlFor="">Attachment(<span className="text-xm text-gray-400">Optional</span>)</label>
                            <input
                                name="attachment"
                                placeholder=" "
                                className="font-poppins mt-2 rounded-lg  h-10 w-[25vw] bg-default-100"
                                type="file"

                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                        </div>

                        <input type="hidden" name="user" value={user._id} />
                        <input type="hidden" name="base64Image" value={base64Image} />

                        <div className="flex justify-end gap-2 mt-10 font-poppins">
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <button onClick={() => {
                                setIsCreateModalOpened(false)
                            }} className="bg-primary-400 rounded-xl font-poppins px-4" >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </CreateModal>

            <ConfirmModal modalbody="Are you sure to complete this ticket?" isOpen={isConfirmModalOpened} onOpenChange={handleConfirModalClosed}>
                <div className="flex gap-4">
                    <Button color="danger" className="font-poppins text-md" onPress={handleConfirModalClosed}>
                        No
                    </Button>
                    <Button color="primary" className="font-poppins text-md" onClick={() => {
                        if (selectedTicket) {
                            submit({
                                id: selectedTicket._id,
                                intent: 'complete',
                                status:  'Completed' 
                            }, {
                                method: 'post',
                            })
                        }
                        setIsConfirmModalOpened(false)
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

            <EditModal modalTitle="Edit Ticket" isOpen={isEditModalOpened} onOpenChange={handleEditModalClosed}>
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="Subject"
                            className="text-sm font-poppins"
                            labelPlacement="outside"
                            placeholder=" "
                            isClearable
                            defaultValue={selectedTicket?.subject}
                            name="subject"
                            isRequired
                            classNames={{
                                inputWrapper: "mt-4",
                            }}
                        />
                        <div className="flex gap-4">
                            <Input
                                className="text-sm font-poppins"
                                label="Category"
                                labelPlacement="outside"
                                placeholder=" "
                                isReadOnly
                                name="support"
                                isRequired
                                defaultValue="IT Support"
                                classNames={{
                                    inputWrapper: "mt-4",
                                }}

                            />
                            <Input
                                className="text-sm font-poppins"
                                label="Location"
                                labelPlacement="outside"
                                placeholder=" "
                                name="location"
                                defaultValue={selectedTicket?.location}
                                isRequired
                                classNames={{
                                    inputWrapper: "mt-4",
                                }}

                            />
                        </div>

                        <div className="pt-4">
                            <Select
                                label="Priority"
                                labelPlacement="outside"
                                placeholder=" "
                                isRequired
                                className="mt-4"
                                name="priority"

                            >
                                {priorities.map((priority) => (
                                    <SelectItem textValue={priority?.name} className="mt-4" key={priority.name}>
                                        {priority?.name}
                                    </SelectItem>
                                ))}

                            </Select>
                        </div>

                        <Textarea
                            className="text-sm font-poppins"
                            label="Description(Optinal)"
                            labelPlacement="outside"
                            placeholder=" "
                            defaultValue={selectedTicket?.description}
                            name="description"
                            classNames={{
                                inputWrapper: "",
                                label: "mt-4"
                            }}
                        />

                        <div className="pt-2 ">
                            <label className="font-poppins block text-sm" htmlFor="">Attachment(<span className="text-xm text-gray-400">Optional</span>)</label>
                            <input
                                name="attachment"
                                placeholder=" "
                                className="font-poppins mt-2 rounded-lg  h-10 w-[25vw] bg-default-100"
                                type="file"

                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                        </div>

                        <input type="hidden" name="user" value={user._id} />
                        <input type="hidden" name="base64Image" value={base64Image} />
                        <input type="hidden" name="id" value={selectedTicket?._id} />
                        <input type="hidden" name="intent" value="update" />

                        <div className="flex justify-end gap-2 mt-10 font-poppins">
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <button onClick={() => {
                                setIsCreateModalOpened(false)
                            }} className="bg-primary-400 rounded-xl font-poppins px-4" >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </EditModal>
        </UserLayout>
    )
}

export default Ticket

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const subject = formData.get("subject") as string;
    const category = formData.get("support") as string;
    const priority = formData.get("priority") as string;
    const description = formData.get("description") as string;
    const attachment = formData.get("base64Image") as string;
    const user = formData.get("user") as string
    const location = formData.get("location") as string
    const id = formData.get("id") as string
    const intent = formData.get("intent") as string
    const status = formData.get('status') as string;



    const tickets =  ticketController.CreaateTickets({ request, subject, category, priority, description, attachment, user, location })
    return {tickets}

}

export const loader: LoaderFunction = async (request) => {
    const { user, tickets } = await ticketController.GetTickets(request);

    return { user, tickets }
}