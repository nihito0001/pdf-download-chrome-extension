import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const convertToPdf = async () => {
  try {
    // MEMO
    // @media printのcssを適用したかったが、うまくいかなかった。
    const canvas = await html2canvas(document.body, {
      scale: 2, // 解像度アップ
    });
    const imgData = canvas.toDataURL('image/png');

    // 縦長か横長かを判断
    const isVertical = canvas.height > canvas.width;

    // A4サイズに調整
    const pdf = new jsPDF(isVertical ? 'l' : 'p', 'mm', 'a4');
    const imgWidth = isVertical ? 210 : 297;
    const pageHeight = isVertical ? 297 : 210;
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
