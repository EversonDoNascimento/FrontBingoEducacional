import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { to, subject, text } = await req.json();

  // Configuração do transporte
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string),
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Bingo Educacional" <${process.env.FROM_EMAIL}>`,
      to: to,
      subject: subject,
      html: text,
    });

    return NextResponse.json({ messageId: info.messageId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao enviar e-mail", details: error.message },
      { status: 500 }
    );
  }
}
