import express from 'express'
import 'dotenv/config'
import supabase from './src/config/supabaseClient.js'
import publicRoutes from './src/routes/public.js'

const app = express();

app.use(express.json())

app.use('/router', publicRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/users', (req, res) => {
    res.send('Usuário encontrado com sucesso!');
});

export default app;