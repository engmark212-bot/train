import jsPDF from "jspdf"

export function generateCertificate(employeeName: string, moduleName: string, score: number) {
  const doc = new jsPDF()
  doc.setFontSize(20)
  doc.text("Certificate of Completion", 105, 50, { align: "center" })
  doc.setFontSize(16)
  doc.text(`This certifies that ${employeeName}`, 105, 70, { align: "center" })
  doc.text(`has successfully completed the module: ${moduleName}`, 105, 80, { align: "center" })
  doc.text(`Score: ${score}`, 105, 90, { align: "center" })
  return doc.output("blob")
}
