import { json, redirect } from "@remix-run/node";
import { TicketInterface } from "~/interfaces/interface";
import AdminRegistration from "~/modal/adminRegistration";
import Registration from "~/modal/registration";
import StaffRegistration from "~/modal/staffRegistration";
import Ticket from "~/modal/tickets";
import { getSession } from "~/session";
class TicketController {
    // creating new ticket
    async CreateTickets({ request, subject, category, priority, description, attachment, user, location, intent }: { request: Request, subject: string, category: string, priority: string, description: string, attachment: string, user: string, location: string, intent: string }) {
        if (intent === "create") {
            try {
                const session = await getSession(request.headers.get("Cookie"));
                const token = session.get("email");

                const tickets = new Ticket({
                    subject,
                    category,
                    priority,
                    description,
                    attachment,
                    user,
                    location,
                });

                const ticketResponse = await tickets.save();

                if (ticketResponse) {
                    return json({ message: "Ticket Created Successfully", success: true }, { status: 200 });
                } else {
                    return json({ message: "Unable to create ticket", success: false }, { status: 400 });
                }
            } catch (error: any) {
                console.error("Error creating ticket:", error);
                return json({ message: error.message, success: false }, { status: 500 });
            }
        }
    }

    //editing tickets
    async EditTickets({ request, subject, category, priority, description, user, location, intent, id }: { request: Request, subject: string, category: string, priority: string, description: string, attachment: string, user: string, location: string, intent: string, id: string }) {
        try {
            if (intent === "update") {
                const updateResponse = await Ticket.findByIdAndUpdate(id, {
                    subject,
                    category,
                    priority,
                    description,
                    location,
                    user,
                })

                if (updateResponse) {
                    return json({ message: "Ticket updated successfull", success: true }, { status: 200 })
                } else {
                    return json({ message: "Unable to update ticket", success: false }, { status: 400 })
                }
            }
        } catch (error: any) {
            console.error("Error creating ticket:", error);
            return json({ message: error.message, success: false }, { status: 500 });
        }
    }

    async DeleteTicket({ intent, id }: { intent: String, id: string }) {

        if (intent === "delete") {
            const deleteResponse = await Ticket.findByIdAndDelete(id)
            if (deleteResponse) {
                return json({ message: "Ticket deleted successfull", success: true }, { status: 200 })
            } else {
                return json({ message: "Unable to delete ticket", success: false }, { status: 400 })
            }
        }
    }

    async CompleteTicket({ intent, id, status }: { intent: String, id: string, status: string }) {

        if (status === "Pending" ) {
            return json({ message: "Can't complete this ticket, it is still unattended", success: false }, { status: 400 });
        } else if (status === "Completed") {
            return json({ message: "Ticket has already been completed", success: false }, { status: 400 });
        } else {
            const updateResponse = await Ticket.findByIdAndUpdate(id, {
                status: "Completed"
            });
        
            if (updateResponse) {
                return json({ message: "Ticket completed successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "Unable to complete ticket", success: false }, { status: 400 });
            }
        }
    }

    async AssignTicket({ stuff, admin, intent, id, status }: { stuff: string, admin: string; intent: String, id: string, status: string }) {

        if (intent === "ticketassignment") {
            if (status === 'Completed') {
                return json({ message: "Ticket has been Completed, can't assign staff", success: false }, { status: 400 })
            } else {
                const assigned = await Ticket.findByIdAndUpdate(id, {
                    stuff,
                    admin,
                    status: "Assigned"
                })

                if (assigned) {
                    return json({ message: "Support Staff assigned successfully", success: true }, { status: 400 })
                } else {
                    return json({ message: "Unable to assign Support Staff", success: true }, { status: 400 })
                }
            }
        }
    }


    async GetTickets({ request }: { request: Request }) {
        const session = await getSession(request.headers.get("Cookie"));
        const token = session.get("email");
        const user = await Registration.findOne({ email: token });
        const admin = await AdminRegistration.findOne({ email: token });
        const staffId = await StaffRegistration.findOne({ email: token });
        const staff = await StaffRegistration.find();



        if (!token) {
            return redirect("/login")
        }
        //user side tickets fetch
        const userTicket = await Ticket.find({ user: user?._id }).populate("stuff")
        //admin side ticket fetch
        const adminTickets = await Ticket.find().populate("stuff").populate("user");
        //staff side ticket fetch
        const staffTickets = await Ticket.find({ stuff: staffId?._id }).populate("user").populate("stuff");




        return { user, admin, staff, userTicket, adminTickets, staffTickets }
    }
}

const ticketController = new TicketController;
export default ticketController;