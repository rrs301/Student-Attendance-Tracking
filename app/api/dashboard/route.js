import { db } from "@/utils";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
     const searchParams=req.nextUrl.searchParams;
     const date=searchParams.get('date')
     const grade=searchParams.get('grade')

     const result=await db.select({
        day:ATTENDACE.day,
        presentCount:sql`count(${ATTENDACE.day})`
     }).from(ATTENDACE)
     .leftJoin(STUDENTS, and (eq(ATTENDACE.studentId,STUDENTS.id),eq(ATTENDACE.date,date)))
     .groupBy(ATTENDACE.day)
     .where(eq(STUDENTS.grade,grade))
     .orderBy(desc(ATTENDACE.day))
     .limit(7)

     return NextResponse.json(result);

}