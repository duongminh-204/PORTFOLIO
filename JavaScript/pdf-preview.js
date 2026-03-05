// pdf-preview.js
const cvUrl = './assets/cv/DuongQuangMinh_cv.pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
async function loadPdfPreview() {
    const loadingElement = document.getElementById('previewLoading');
    const canvas = document.getElementById('pdfPreviewCanvas');
    if (!canvas || typeof pdfjsLib === 'undefined') return;

    try {

        if (typeof pdfjsLib !== 'undefined' && (!pdfjsLib.GlobalWorkerOptions || !pdfjsLib.GlobalWorkerOptions.workerSrc) && window.__pdfWorkerSrc) {
            pdfjsLib.GlobalWorkerOptions = pdfjsLib.GlobalWorkerOptions || {};
            pdfjsLib.GlobalWorkerOptions.workerSrc = window.__pdfWorkerSrc;
        }

        const pdf = await pdfjsLib.getDocument(cvUrl).promise;
        const page = await pdf.getPage(1);
        const scale = 2.1;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        await page.render({
            canvasContext: ctx,
            viewport: viewport
        }).promise;

        if (loadingElement) loadingElement.style.display = 'none';
    } catch (error) {
        console.error('Lỗi khi render preview CV:', error);
        if (loadingElement) {
            loadingElement.innerHTML = 'Không thể tải preview CV<br><small>Vui lòng thử "Xem CV đầy đủ"</small>';
        }
    }
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPdfPreview);
} else {

    setTimeout(loadPdfPreview, 100);
}