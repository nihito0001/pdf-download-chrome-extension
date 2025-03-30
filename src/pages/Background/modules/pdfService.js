export const generatePDF = async (debuggee) => {
  const pdfOptions = {
    printBackground: true,
    paperWidth: 8.27, // A4 (210mm)
    paperHeight: 11.7, // A4 (297mm)
    marginTop: 0.5,
    marginBottom: 0.5,
    marginLeft: 0.5,
    marginRight: 0.5,
    scale: 1,
    landscape: false,
  };

  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(debuggee, 'Page.enable', {}, () => {
      chrome.debugger.sendCommand(
        debuggee,
        'Page.printToPDF',
        pdfOptions,
        ({ data }) => {
          const binaryPDF = atob(data);
          const len = binaryPDF.length;
          const buffer = new Uint8Array(len);
          for (let i = 0; i < len; ++i) {
            buffer[i] = binaryPDF.charCodeAt(i);
          }
          const blob = new Blob([buffer], { type: 'application/pdf' });
          resolve(blob);
        }
      );
    });
  });
};
