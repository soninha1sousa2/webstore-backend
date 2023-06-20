import connect from "../../db/database";
import Bolo from "../../models/boloSchema";

connect();

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      const { id } = req.query;
      const deletedBolo = await Bolo.findByIdAndDelete(id);
      if (!deletedBolo) {
        return res.json({ code: "Bolo not found." });
      }
      return res.json({ code: "Bolo deleted successfully." });
    } else {
      return res.status(405).json({ code: "Method not allowed." });
    }
  } catch (error) {
    res.status(400).json({ status: "Not able to delete." });
  }
}

