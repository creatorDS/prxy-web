const urlInput = document.getElementById('url');
const proxyButton = document.getElementById('proxyButton');
const proxyFrame = document.getElementById('proxyFrame');
const backendURL = 'https://prxy-web.onrender.com'; // Reemplaza con la URL de tu aplicación Render


proxyButton.addEventListener('click', async () => {
    const url = urlInput.value;

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch(`${backendURL}/proxy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Proxy request failed');
        }
        //  Asignar la URL al iframe para que se cargue el contenido
        proxyFrame.src = url;

    } catch (error) {
        console.error('Frontend error:', error);
        alert(error.message);
    }
});
