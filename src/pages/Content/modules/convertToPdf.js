import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const convertToPdf = async () => {
  try {
    // ページ全体をキャプチャ
    const canvas = await html2canvas(document.body, {
      scale: 2, // 解像度アップ
    });
    const imgData = canvas.toDataURL('image/png');

    // A4サイズに調整
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 複数ページ対応
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('webpage.pdf');
  } catch (error) {
    console.error('PDF変換中にエラーが発生しました:', error);
  }
};

export default convertToPdf;
