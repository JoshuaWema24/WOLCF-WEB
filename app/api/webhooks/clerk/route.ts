import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export const POST = async (req: Request) => {
	const payload = await req.json();
	const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET!);
	const _headers = await headers();

	const svixId = _headers.get("svix-id");
	const svixSignature = _headers.get("svix-signature");
	const svixTimestamp = _headers.get("svix-timestamp");

	if (!svixId || !svixSignature || !svixTimestamp)
		return NextResponse.json({ msg: "Invalid Request" }, { status: 400 });

	let evt: WebhookEvent;

	try {
		evt = wh.verify(JSON.stringify(payload), {
			"svix-id": svixId,
			"svix-signature": svixSignature,
			"svix-timestamp": svixTimestamp,
		}) as WebhookEvent;
	} catch (error: any) {
		console.error("Verification Failed");
		return NextResponse.json({ msg: error }, { status: 400 });
	}

	// User Events
	if (evt.type === "user.created") {
		try {
			const {
				id: clerkId,
				first_name: fname,
				last_name: lname,
				image_url: imageUrl,
				email_addresses,
			} = evt.data;

			await createUser(
				{
					clerkId,
					fname: fname!,
					lname: lname!,
					imageUrl,
					email: email_addresses[0].email_address,
				},
				"/"
			);

			return NextResponse.json({ msg: "User Created." }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Create User Failed!" }, { status: 500 });
		}
	}

	if (evt.type === "user.updated") {
		try {
			const {
				id: clerkId,
				first_name: fname,
				last_name: lname,
				image_url: imageUrl,
				email_addresses,
			} = evt.data;

			await updateUser(
				{
					clerkId,
					fname: fname!,
					lname: lname!,
					imageUrl,
					email: email_addresses[0].email_address,
				},
				"/"
			);

			return NextResponse.json({ msg: "User Updated." }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Update User Failed!" }, { status: 500 });
		}
	}

	if (evt.type === "user.deleted") {
		try {
			const { id: clerkId } = evt.data;

			await deleteUser(clerkId!, "/");

			return NextResponse.json({ msg: "User Deleted." }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Delete User Failed!" }, { status: 500 });
		}
	}

	return NextResponse.json(
		{ msg: "Clerk Auth Run successfully, Buh msg not recognized" },
		{ status: 200 }
	);
};
