import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCsv(
  filename: string,
  headers: string[],
  rows: string[][],
) {
  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map((c) => escapeCsvCell(c)).join(",")),
  ];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function savePdf(doc: jsPDF, filename: string) {
  doc.save(filename);
}

export function exportClubInterestsCsv(
  rows: {
    name: string;
    course: string;
    enrollment_number: string;
    semester: string;
    club_name: string;
    not_interested: boolean | null;
    other_club: string | null;
    created_at: string;
  }[],
  formatDate: (iso: string) => string,
) {
  downloadCsv(
    `club-interests-${new Date().toISOString().slice(0, 10)}.csv`,
    [
      "Name",
      "Course",
      "Enrollment",
      "Semester",
      "Clubs",
      "Not interested",
      "Other club",
      "Submitted (IST)",
    ],
    rows.map((r) => [
      r.name,
      r.course,
      r.enrollment_number,
      r.semester,
      r.club_name,
      r.not_interested ? "Yes" : "No",
      r.other_club ?? "",
      formatDate(r.created_at),
    ]),
  );
}

export function exportClubInterestsPdf(
  rows: {
    name: string;
    course: string;
    enrollment_number: string;
    semester: string;
    club_name: string;
    created_at: string;
  }[],
  formatDate: (iso: string) => string,
) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(14);
  doc.text("CSS AMU — Club interest submissions", 14, 14);
  autoTable(doc, {
    startY: 20,
    head: [
      ["Name", "Course", "Enrollment", "Sem", "Clubs", "Submitted"],
    ],
    body: rows.map((r) => [
      r.name,
      r.course,
      r.enrollment_number,
      r.semester,
      r.club_name,
      formatDate(r.created_at),
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [48, 53, 181] },
  });
  savePdf(
    doc,
    `club-interests-${new Date().toISOString().slice(0, 10)}.pdf`,
  );
}

export function exportContactCsv(
  rows: {
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  }[],
  formatDate: (iso: string) => string,
) {
  downloadCsv(
    `contact-messages-${new Date().toISOString().slice(0, 10)}.csv`,
    ["Name", "Email", "Subject", "Message", "Submitted (IST)"],
    rows.map((r) => [
      r.name,
      r.email,
      r.subject,
      r.message,
      formatDate(r.created_at),
    ]),
  );
}

export function exportContactPdf(
  rows: {
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  }[],
  formatDate: (iso: string) => string,
) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(14);
  doc.text("CSS AMU — Contact messages", 14, 14);
  autoTable(doc, {
    startY: 20,
    head: [["Name", "Email", "Subject", "Message", "Submitted"]],
    body: rows.map((r) => [
      r.name,
      r.email,
      r.subject || "—",
      r.message.length > 120 ? `${r.message.slice(0, 117)}…` : r.message,
      formatDate(r.created_at),
    ]),
    styles: { fontSize: 7 },
    headStyles: { fillColor: [48, 53, 181] },
    columnStyles: { 3: { cellWidth: 80 } },
  });
  savePdf(
    doc,
    `contact-messages-${new Date().toISOString().slice(0, 10)}.pdf`,
  );
}
