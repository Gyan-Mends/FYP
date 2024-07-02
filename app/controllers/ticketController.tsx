import { json, redirect } from "@remix-run/node";
import { TicketInterface } from "~/interfaces/interface";
import AdminRegistration from "~/modal/adminRegistration";
import Registration from "~/modal/registration";
import StaffRegistration from "~/modal/staffRegistration";
import Ticket from "~/modal/tickets";
import { getSession } from "~/session";
class TicketController {

    async AddTickets({ request, subject, category, priority, description, attachment, user, location, id, intent,admin,stuff,status }: { request: Request, subject: string, category: string, priority: string, description: string, attachment: string, user: string, location: string, id: string, intent: string,admin:string,stuff:string,status:string }) {
        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");
            if (intent === "update") {
                const updateResponse = await Ticket.findByIdAndUpdate(id, {
                    subject,
                    category,
                    priority,
                    description,
                    location,
                    status,
                    user,
                    admin,
                    stuff,
                })

                if (updateResponse) {
                    return json({ message: "Ticket updated successfull", success: true }, { status: 200 })
                } else {
                    return json({ message: "Unable to update ticket", success: false }, { status: 400 })
                }
            }

            if (intent === "delete") {
                const deleteResponse = await Ticket.findByIdAndDelete(id)
                if (deleteResponse) {
                    return json({ message: "Ticket deleted successfull", success: true }, { status: 200 })
                } else {
                    return json({ message: "Unable to delete ticket", success: false }, { status: 400 })
                }
            }

            const tickets = new Ticket({
                subject,
                category,
                priority,
                description,
                attachment: attachment,
                user,
                location,
            })

            const ticketResponse = await tickets.save()

            if (ticketResponse) {
                return json({ message: "Ticket Created Succeefully", success: true }, { status: 200 });
            } else {
                return json({ message: "Unable to create ticket", success: false }, { status: 400 });
            }
        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 500 });

        }
    }

    async GetTickets({ request }: { request: Request }) {
        const session = await getSession(request.headers.get("Cookie"));
        const token = session.get("email");
        const user = await Registration.findOne({ email: token });
        const admin = await AdminRegistration.findOne({email:token});
        const staffId = await StaffRegistration.findOne({email:token});
        const staff = await StaffRegistration.find();
        
        

        if (!token) {
            return redirect("/login")
        }
        //user side tickets fetch
        const tickets = await Ticket.find({ user: user?._id })
        //admin side ticket fetch
        const adminTickets = await Ticket.find().populate("stuff");
        //staff side ticket fetch
        const staffTickets =  await Ticket.find({stuff:staffId?._id}).populate("stuff");
        
        

        return { user,admin,staff,tickets,adminTickets,staffTickets }
    }
}

const ticketController = new TicketController;
export default ticketController;