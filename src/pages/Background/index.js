import { generatePDF } from './modules/pdfService';
import {
  getPresignedUrl,
  uploadPDF,
  generateKey,
} from './modules/uploadService';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('onMessage', request, sender, sendResponse);

  if (request.action === 'uploadPdf') {
    console.log('uploadPdf');
    const debuggee = { tabId: sender.tab.id };

    chrome.debugger.attach(debuggee, '1.3', async () => {
      try {
        const pdfBlob = await generatePDF(debuggee);
        const key = generateKey();
        const putObjectUrl = await getPresignedUrl(key);

        if (!putObjectUrl) {
          throw new Error('Failed to get presigned URL');
        }

        const response = await uploadPDF(putObjectUrl, pdfBlob);
        console.log('Upload response:', response);

        sendResponse({ success: true });
      } catch (error) {
        console.error('Error:', error);
        sendResponse({ success: false });
      } finally {
        chrome.debugger.detach(debuggee);
      }
    });

    return true;
  }
});
