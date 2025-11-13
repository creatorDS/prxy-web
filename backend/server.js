require('dotenv').config(); // Cargar variables de entorno desde .env

const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Habilitar CORS (Cross-Origin Resource Sharing)
const app = express();
const port = process.env.PORT || 3000; // Usar el puerto definido en el entorno o 3000 por defecto

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas

// Ruta proxy
app.post('/proxy', async (req, res) => {
    const { url } = req.body; // La URL a la que se va a hacer proxy se envía en el cuerpo de la solicitud

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'stream' // Para manejar contenido binario (imágenes, etc.)
        });

        // Reenviar los encabezados de la respuesta original
        res.writeHead(response.status, response.headers);

        // Transmitir el contenido directamente al cliente
        response.data.pipe(res);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy request failed', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
