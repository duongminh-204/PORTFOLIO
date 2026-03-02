// cv-modal.js
function bindCvPreview() {
    const previewTrigger = document.getElementById('previewTrigger');
    if (!previewTrigger) return;

    previewTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const fullIframe = document.getElementById('pdfViewerIframe');
        const loading = document.getElementById('pdfLoading');
        const pdfUrl = 'assets/cv/DuongQuangMinh_CV.pdf';

        if (loading) loading.style.display = 'block';
        
    
        if (fullIframe) {
            fullIframe.src = pdfUrl;
            fullIframe.onload = () => {
                if (loading) loading.style.display = 'none';
            };
          
            setTimeout(() => {
                if (loading) loading.style.display = 'none';
            }, 2000);
        }

        // Show modal
        const cvModal = new bootstrap.Modal(document.getElementById('cvModal'));
        cvModal.show();

     
        const cvModalEl = document.getElementById('cvModal');
        cvModalEl?.addEventListener('hidden.bs.modal', () => {
            if (fullIframe) fullIframe.src = '';
        }, { once: true });
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindCvPreview);
} else {
    bindCvPreview();
}


setTimeout(bindCvPreview, 500);