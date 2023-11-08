import { NextApiRequest, NextApiResponse } from "next";
import { sendAutomaticEmail } from "../../../scripts/send_automatic_email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sendgridResponse = await sendAutomaticEmail();

    res.status(200).json({ sendgridResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
