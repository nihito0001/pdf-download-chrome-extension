import { convertToPdf } from './modules/convertToPdf';

// 画面右下にボタンを追加1
const button = document.createElement('button');
button.textContent = 'PDFを保存(jsPDF)';
button.className = 'pdf-save-button';
button.addEventListener('click', () => {
  button.classList.add('loading');
  convertToPdf().finally(() => {
    button.classList.remove('loading');
  });
});
document.body.appendChild(button);

// 画面右下にボタンを追加2
const button2 = document.createElement('button');
button2.textContent = 'PDFを保存(chrome拡張機能)';
button2.className = 'pdf-upload-button';
button2.addEventListener('click', () => {
  button2.classList.add('loading');

  // background.jsにメッセージを送信
  chrome.runtime.sendMessage({ action: 'uploadPdf' }, (response) => {
    console.log('response', response);
    if (response && response.success) {
      alert('PDFのアップロードが成功しました！');
    } else {
      alert('PDFのアップロードに失敗しました。');
    }
    button2.classList.remove('loading');
  });
});
document.body.appendChild(button2);
