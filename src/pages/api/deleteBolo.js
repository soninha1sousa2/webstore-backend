import connect from "../../db/database";
import Bolo from "../../models/boloSchema";

connect();

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const deletedBolo = await Bolo.findByIdAndDelete(id);

    if (!deletedBolo) {
      return res.status(404).json({ code: "Bolo not found" });
    }

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    return res.status(200).json({ code: "Bolo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Not able to delete." });
  }
}

