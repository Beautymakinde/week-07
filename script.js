document.addEventListener('DOMContentLoaded', () => {
    const selfieUpload = document.getElementById('selfie-upload');
    const selfieDisplay = document.getElementById('selfie-display');
    const tryOnSection = document.querySelector('.try-on-section');
    const wigOverlay = document.getElementById('wig-overlay');
    const wigButtons = document.querySelectorAll('.wig-button');
    const wigSize = document.getElementById('wig-size');
    const wigPositionY = document.getElementById('wig-position-y');

    // Wig options with their image paths
    const wigs = {
        wig1: 'assets/wig-long-straight.png',
        wig2: 'assets/wig-curly.png',
        wig3: 'assets/wig-bob.png',
        wig4: 'assets/wig-wavy.png'
    };

    let currentWig = null;

    // Handle selfie upload
    selfieUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                selfieDisplay.src = e.target.result;
                selfieDisplay.style.display = 'block';
                tryOnSection.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle wig selection
    wigButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wigType = button.getAttribute('data-wig');
            
            // Remove active class from all buttons
            wigButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update the wig overlay
            currentWig = wigType;
            updateWigOverlay();
        });
    });

    // Handle wig size changes
    wigSize.addEventListener('input', updateWigOverlay);
    wigPositionY.addEventListener('input', updateWigOverlay);

    // Update the wig overlay based on current settings
    function updateWigOverlay() {
        if (!currentWig) return;

        const size = wigSize.value;
        const posY = wigPositionY.value;

        wigOverlay.style.backgroundImage = `url(${wigs[currentWig]})`;
        wigOverlay.style.backgroundSize = `${size}%`;
        wigOverlay.style.backgroundPosition = `top ${posY}px center`;
    }
});