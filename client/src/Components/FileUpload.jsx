{
  /* <input type="file" id="pdfFileInput">


const fileInput = document.getElementById("pdfFileInput");

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const arrayBuffer = event.target.result;
    const text = await extractPdfText(arrayBuffer);
    console.log(text);
  };

  reader.readAsArrayBuffer(file);
});


const extractPdfText = async (arrayBuffer) => {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }

  return text;
}; */
}
