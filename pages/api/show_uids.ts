import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const uidsPath = path.join(process.cwd(), "lib", "uids.json");
  let uids: string[] = [];
  try {
    uids = JSON.parse(fs.readFileSync(uidsPath, "utf8"));
  } catch (e) {
    return res.status(500).json({ error: "Could not read uids.json" });
  }
  res.status(200).json({ uids });
}