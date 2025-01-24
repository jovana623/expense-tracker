import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function handleDownloadPDF(type, period) {
  const element = document.getElementById("pdf-content");

  element.classList.add("desktop-view");

  const canvas = await html2canvas(element, { scale: 2 });

  element.classList.remove("desktop-view");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const ratio = pdfWidth / canvasWidth;
  const scaledHeight = canvasHeight * ratio;

  let yPosition = 0;
  while (yPosition < scaledHeight) {
    const cropHeight = Math.min(scaledHeight - yPosition, pdfHeight);
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = canvas.width;
    cropCanvas.height = cropHeight / ratio;

    const cropContext = cropCanvas.getContext("2d");
    cropContext.drawImage(
      canvas,
      0,
      yPosition / ratio,
      canvas.width,
      cropCanvas.height,
      0,
      0,
      cropCanvas.width,
      cropCanvas.height
    );

    const croppedImgData = cropCanvas.toDataURL("image/png");
    pdf.addImage(croppedImgData, "PNG", 0, 0, pdfWidth, cropHeight);

    yPosition += pdfHeight;
    if (yPosition < scaledHeight) {
      pdf.addPage();
    }
  }

  pdf.save(`${type}_Report_${period}.pdf`);
}
