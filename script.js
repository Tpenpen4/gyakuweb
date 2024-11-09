function sendData() {
  const userInput = document.getElementById('userInput').value;
  const url = `https://tpenpen4.com/api/gyaku/gyaku.php?text=${encodeURIComponent(userInput)}`;

  fetch(url)
.then(response => response.text()) // JSONとしてではなく、まずはテキストとして取得
.then(text => {
if (text.includes('<!DOCTYPE html>')) {
  throw new Error('リクエストが多すぎるか、文字数が多すぎます');
}

const data = JSON.parse(text); // JSON として解析
document.getElementById('result').textContent = data.response || data.error;
})
.catch(error => {
document.getElementById('result').textContent = 'エラーが発生しました:';
console.error('エラー:', error);
});
}
const textarea = document.querySelector('.large-textarea');
const charCount = document.querySelector('.char-count');
// 入力イベントリスナー
textarea.addEventListener('input', () => {
const maxLength = parseInt(textarea.getAttribute('maxlength')) || 200;
const currentLength = textarea.value.length;
charCount.textContent = `${currentLength} / ${maxLength}`;

if (currentLength === maxLength) {
// 文字数制限に達したら枠線を赤くして、sendDataを無効化
textarea.classList.add('limit-reached');
} else {
// 文字数が制限未満のときは通常の枠線色に戻す
textarea.classList.remove('limit-reached');
sendData(); // 文字数が制限に達していない場合のみsendDataを実行
}
});