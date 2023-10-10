import { NextRequest, NextResponse } from "next/server";
import { loggerInfo } from "@/logger";

export function Get(req: NextRequest) {
  loggerInfo.info(`GET /api/getUsers ${req}`);
  return NextResponse.json({
    message: "Success",
    status: 200,
  });
}
