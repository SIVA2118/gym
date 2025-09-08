const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const filePath = './members.json';

// ✅ Read existing data
function readData() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Create empty array if file doesn't exist
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// ✅ Write new data
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ✅ POST: Create new member
app.post('/members', (req, res) => {
    const { id, title, joinDate, expiryDate, package: packageType } = req.body;

    if (!id || !title || !joinDate || !expiryDate || !packageType) {
        return res.status(400).json({ error: 'All fields (id, title, joinDate, expiryDate, package) are required' });
    }

    const data = readData();
    if (data.find(member => member.id === id)) {
        return res.status(400).json({ error: 'ID already exists' });
    }

    const newMember = { id, title, joinDate, expiryDate, package: packageType };
    data.push(newMember);
    writeData(data);

    res.json({ message: 'Member created successfully!', data: newMember });
});

// ✅ GET: Read all members
app.get('/members', (req, res) => {
    const data = readData();
    res.json(data);
});

// ✅ GET: Read a specific member by ID
app.get('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const data = readData();

    const member = data.find(m => m.id === memberId);
    if (!member) {
        return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
});

// ✅ PUT: Update a member by ID
app.put('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const { title, joinDate, expiryDate, package: packageType } = req.body;

    const data = readData();
    const index = data.findIndex(member => member.id === memberId);

    if (index === -1) {
        return res.status(404).json({ error: 'Member not found' });
    }

    if (title) data[index].title = title;
    if (joinDate) data[index].joinDate = joinDate;
    if (expiryDate) data[index].expiryDate = expiryDate;
    if (packageType) data[index].package = packageType;

    writeData(data);
    res.json({ message: 'Member updated successfully!', data: data[index] });
});

// ✅ DELETE: Delete a member by ID
app.delete('/members/:id', (req, res) => {
    const memberId = req.params.id;

    const data = readData();
    const index = data.findIndex(member => member.id === memberId);

    if (index === -1) {
        return res.status(404).json({ error: 'Member not found' });
    }

    data.splice(index, 1);
    writeData(data);

    res.json({ message: 'Member deleted successfully!' });
});

app.listen(port, () => {
    console.log(`✅ Gym Membership Server running on http://localhost:${port}`);
});
