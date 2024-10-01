const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtórioIterativo = (m, n) => {
    let resultado = 1;
    for (let i = m; i <= n; i++) {
        resultado *= (i + 1 / i);
    }
    return resultado;
};


const produtórioRecursivo = (m, n) => {
    if (m > n) return 1; // caso base
    return (m + 1 / m) * produtórioRecursivo(m + 1, n);
};


app.post('/produtorio', (req, res) => {
    const { m, n, metodo } = req.body;

    if (typeof m !== 'number' || typeof n !== 'number' || !['iterativo', 'recursivo'].includes(metodo)) {
        return res.status(400).json({ error: 'Parâmetros inválidos. Informe m, n e metodo (iterativo ou recursivo).' });
    }

    let resultado;
    if (metodo === 'iterativo') {
        resultado = produtórioIterativo(m, n);
    } else {
        resultado = produtórioRecursivo(m, n);
    }

    res.json({ resultado });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
