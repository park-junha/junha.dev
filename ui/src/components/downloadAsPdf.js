import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function downloadAsPdf(id) {
  const input = document.getElementById(id);
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save("download.pdf");
    })
  ;
}
