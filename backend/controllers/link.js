const linkModel = require('../model/link.js');
const generateCode = require('../utils/generateCode.js');
const validateUrl = require('../utils/validateUrl.js');

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

const createShortLink=async(req, res) => {
  try {
    const { url, code } = req.body || {};
    if (!validateUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const existingUrl = await linkModel.findByUrl(url);
    if (existingUrl) {
      return res.status(409).json({ error: 'URL already exists' });
    }

    let shortCode = code ? String(code) : null;

    if (shortCode) {
      if (!CODE_REGEX.test(shortCode)) {
        return res.status(400).json({ error: 'Invalid code format' });
      }
      const existing = await linkModel.findByCode(shortCode);
      if (existing) {
        return res.status(409).json({ error: 'Code already exists' });
      }
    } else {
      for (let i = 0; i < 5; i += 1) {
        const candidate = generateCode(7);
        const exists = await linkModel.findByCode(candidate);
        if (!exists) {
          shortCode = candidate;
          break;
        }
      }
      if (!shortCode) {
        return res.status(500).json({ error: 'Failed to generate unique code' });
      }
    }

    const saved = await linkModel.create({ code: shortCode, target_url: url });
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

const getAllLinks=async(req, res) => {
  try {
    const rows = await linkModel.getAll();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

const getLinkStats=async(req, res) => {
  try {
    const { code } = req.params;
    const link = await linkModel.findByCode(code);
    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json(link);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

const deleteLink=async(req, res) => {
  try {
    const { code } = req.params;
    const ok = await linkModel.deleteByCode(code);
    if (!ok) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json({message:'Deleted Successfully'});
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

const redirectByCode=async(req, res) => {
  try {
    const { code } = req.params;
    const updated = await linkModel.incrementClicksAndGet(code);
    if (!updated) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.redirect(302, updated.target_url.trim());
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports={
    createShortLink,
    getAllLinks,
    getLinkStats,
    deleteLink,
    redirectByCode
}

