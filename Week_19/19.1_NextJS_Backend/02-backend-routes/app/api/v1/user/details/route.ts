import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        user: "Harkirat",
        name: "Harkirat Singh",
        email: "harkirat@gmail.com"
    });
};

export function POST() {
    return NextResponse.json({
        user: "Harkirat",
        name: "Harkirat Singh",
        email: "harkirat@gmail.com"
    });
};

export function PUT() {
    return NextResponse.json({
        user: "Harkirat",
        name: "Harkirat Singh",
        email: "harkirat@gmail.com"
    });
};