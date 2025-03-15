chrome.action.onClicked.addListener((tab) => {
  console.log('onClicked');
  const debuggee = { tabId: tab.id };

  chrome.debugger.attach(debuggee, '1.3', () => {
    chrome.debugger.sendCommand(debuggee, 'Page.enable', {}, () => {
      chrome.debugger.sendCommand(
        debuggee,
        'Page.printToPDF',
        {
          printBackground: true,
          paperWidth: 8.27, // A4 (210mm)
          paperHeight: 11.7, // A4 (297mm)
          marginTop: 0.5,
          marginBottom: 0.5,
          marginLeft: 0.5,
          marginRight: 0.5,
          scale: 1,
          landscape: false,
        },
        ({ data }) => {
          const binaryPDF = atob(data);
          const len = binaryPDF.length;
          const buffer = new Uint8Array(len);
          for (let i = 0; i < len; ++i) {
            buffer[i] = binaryPDF.charCodeAt(i);
          }
          const blob = new Blob([buffer], { type: 'application/pdf' });

          console.log('blob', blob);

          // PDFをアップロード
          //   const reader = new FileReader();
          //   reader.onloadend = () => {
          //     const base64Data = reader.result.split(',')[1];
          //     chrome.downloads.download({
          //       url: `data:application/pdf;base64,${base64Data}`,
          //       filename: 'page.pdf',
          //       saveAs: true,
          //     });
          //   };
          //   reader.readAsDataURL(blob);

          // 終了処理
          chrome.debugger.detach(debuggee);
        }
      );
    });
  });
});
