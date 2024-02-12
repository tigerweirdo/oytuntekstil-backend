// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Borc = require('./models/Borc'); // Borç modelini import et


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://temmuzcetiner:a94gEjBSfJTaQic5@oytun.vxssfaa.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Borç eklemek için endpoint
app.post('/api/borclar', async (req, res) => {
    const yeniBorc = new Borc(req.body);
    try {
        const kaydedilen = await yeniBorc.save();
        res.status(201).json(kaydedilen);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Borçları listelemek için endpoint
app.get('/api/borclar', async (req, res) => {
    try {
        const borclar = await Borc.find();
        res.json(borclar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bir borcu ödendi olarak işaretleme
app.patch('/api/borclar/:id', async (req, res) => {
    try {
        const borc = await Borc.findByIdAndUpdate(req.params.id, { new: true });
        res.json(borc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/borclar/:id', async (req, res) => {
    try {
        // Assuming req.body contains the full updated debt object
        const updatedBorc = req.body;
        const borc = await Borc.findByIdAndUpdate(req.params.id, updatedBorc, { new: true });
        if (!borc) {
            return res.status(404).json({ message: "Borç bulunamadı." });
        }
        res.json(borc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Bir borcu silmek için endpoint
app.delete('/api/borclar/:id', async (req, res) => {
    try {
        await Borc.findByIdAndDelete(req.params.id);
        res.json({ message: 'Borç silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`${PORT} üzerinde sunucu çalışıyor.`);
});
