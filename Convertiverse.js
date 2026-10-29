(() => {
    // jsPDF is exported as window.jspdf.jsPDF with this CDN script, so we get it like this:
    const { jsPDF } = window.jspdf || {};
  
    if (!jsPDF) {
      alert('Failed to load jsPDF library. Please check your connection or script source.');
      return;
    }
  
    const input = document.getElementById('image-input');
    const preview = document.getElementById('preview');
    const convertBtn = document.getElementById('convert-btn');
  
    let images = [];
  
    function resetPreview() {
      images = [];
      preview.innerHTML = '';
      convertBtn.disabled = true;
      convertBtn.textContent = 'Convert to PDF';
    }
  
    input.addEventListener('change', () => {
      resetPreview();
      if (!input.files.length) return;
      const files = Array.from(input.files);
  
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
  
      imageFiles.forEach((file, i) => {
        const img = document.createElement('img');
        img.alt = `Preview Image ${i + 1}`;
        img.tabIndex = 0;
  
        const reader = new FileReader();
        reader.onload = function(event) {
          img.src = event.target.result;
          images.push(event.target.result);
          if (images.length) convertBtn.disabled = false;
        };
        reader.readAsDataURL(file);
  
        preview.appendChild(img);
      });
    });
  
    function showLoader() {
      convertBtn.textContent = 'Generating PDF ';
      const loader = document.createElement('span');
      loader.id = 'loader';
      convertBtn.appendChild(loader);
      convertBtn.disabled = true;
    }
  
    function hideLoader() {
      convertBtn.textContent = 'Convert to PDF';
      convertBtn.disabled = images.length === 0;
    }
  
    async function convertImagesToPDF(imgDataList) {
      if (!imgDataList.length) return;
  
      const pdf = new jsPDF();
  
      for (let i = 0; i < imgDataList.length; i++) {
        const imgData = imgDataList[i];
  
        const img = await loadImage(imgData);
  
        // PDF size
        let pdfWidth = pdf.internal.pageSize.getWidth();
        let pdfHeight = pdf.internal.pageSize.getHeight();
  
        const margin = 10;
        const maxWidth = pdfWidth - margin * 2;
        const maxHeight = pdfHeight - margin * 2;
  
        let imgWidth = img.naturalWidth;
        let imgHeight = img.naturalHeight;
  
        const widthRatio = maxWidth / imgWidth;
        const heightRatio = maxHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);
  
        imgWidth = imgWidth * ratio;
        imgHeight = imgHeight * ratio;
  
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;
  
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
  
        if (i < imgDataList.length - 1) {
          pdf.addPage();
        }
      }
  
      return pdf;
    }
  
    function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Image load error'));
        img.src = src;
      });
    }
  
    convertBtn.addEventListener('click', async () => {
      if (!images.length) return;
      try {
        showLoader();
        const pdf = await convertImagesToPDF(images);
        pdf.save('images.pdf');
      } catch (e) {
        alert('Failed to generate PDF. Please try again.');
        console.error(e);
      } finally {
        hideLoader();
      }
    });
  })();
  