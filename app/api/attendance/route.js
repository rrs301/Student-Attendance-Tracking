import { db } from "@/utils";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, asc, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {

    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const month = searchParams.get('month')

    const result = await db.select({
        name: STUDENTS.name,
        present: ATTENDACE.present,
        day: ATTENDACE.day,
        date: ATTENDACE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDACE.id
    }).from(STUDENTS)
        .leftJoin(ATTENDACE, and(eq(STUDENTS.id, ATTENDACE.studentId), eq(ATTENDACE.date, month)))
        .where(eq(STUDENTS.grade, grade))
        .orderBy(asc(STUDENTS.id))
        

    return NextResponse.json(result);
}

export async function POST(req, res) {
    const data = await req.json();
    const result = await db.insert(ATTENDACE)
        .values({
            studentId: data.studentId,
            present: data.present,
            day: data.day,
            date: data.date
        })

    return NextResponse.json(result);

}

export async function DELETE(req) {

    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');


    const result = await db.delete(ATTENDACE)
        .where(
            and(
                eq(ATTENDACE.studentId, studentId),
                eq(ATTENDACE.day, day),
                eq(ATTENDACE.date, date)
            )
        )


    return NextResponse.json(result);
}