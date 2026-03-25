#!/usr/bin/env node
/**
 * rebuild-registry.js v1.0.0
 * Adapted from vibecoding-starter for niwashi-studio.
 *
 * Scans skills/{category}/{skill-name}/SKILL.md
 * Generates skills-index.json (compact LLM-optimized index)
 *
 * Usage: node skills/rebuild-registry.js
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_VERSION = '1.0.0';
const SKILLS_BASE = path.join(__dirname);
const INDEX_PATH = path.join(SKILLS_BASE, 'skills-index.json');
const CATEGORIES = ['narrative', 'external'];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm = {};
  let currentKey = null;
  match[1].split('\n').forEach(line => {
    // Handle multiline description (continuation lines start with spaces)
    if (currentKey === 'description' && /^\s/.test(line) && !line.includes(':')) {
      fm.description += ' ' + line.trim();
      return;
    }
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      fm[key] = value;
      currentKey = key;
    }
  });
  return fm;
}

function formatIndexJson(index) {
  const lines = ['{'];
  lines.push(`  "v": "${index.v}",`);
  lines.push(`  "n": ${index.n},`);
  lines.push('  "skills": {');

  const categories = Object.keys(index.skills);
  categories.forEach((cat, catIdx) => {
    const isLastCat = catIdx === categories.length - 1;
    lines.push(`    "${cat}": [`);

    const skills = index.skills[cat];
    skills.forEach((skill, skillIdx) => {
      const isLastSkill = skillIdx === skills.length - 1;
      const skillJson = JSON.stringify(skill);
      lines.push(`      ${skillJson}${isLastSkill ? '' : ','}`);
    });

    lines.push(`    ]${isLastCat ? '' : ','}`);
  });

  lines.push('  }');
  lines.push('}');
  return lines.join('\n');
}

function main() {
  console.log('Skills Registry Rebuild v' + REGISTRY_VERSION);
  console.log('');

  // Guard: check no SKILL.md files exist at skills/ root level
  const rootSkills = fs.readdirSync(SKILLS_BASE)
    .filter(f => {
      const p = path.join(SKILLS_BASE, f);
      return fs.statSync(p).isDirectory() && 
             fs.existsSync(path.join(p, 'SKILL.md')) &&
             !CATEGORIES.includes(f);
    });

  if (rootSkills.length > 0) {
    console.error('ERROR: Found uncategorized skills at root level:');
    rootSkills.forEach(s => console.error('  - skills/' + s));
    console.error('Move them to skills/narrative/ or skills/external/ first.');
    process.exit(1);
  }

  const allSkills = [];
  const errors = [];

  CATEGORIES.forEach(category => {
    const catPath = path.join(SKILLS_BASE, category);
    if (!fs.existsSync(catPath)) {
      console.log('  (skip) ' + category + '/ not found');
      return;
    }

    const folders = fs.readdirSync(catPath, { withFileTypes: true })
      .filter(d => d.isDirectory());

    folders.forEach(folder => {
      const skillPath = path.join(catPath, folder.name, 'SKILL.md');

      if (!fs.existsSync(skillPath)) {
        errors.push('Missing SKILL.md: ' + category + '/' + folder.name);
        return;
      }

      try {
        const content = fs.readFileSync(skillPath, 'utf-8');
        const fm = parseFrontmatter(content);

        if (!fm) {
          errors.push('No frontmatter: ' + folder.name);
          return;
        }
        if (!fm.name) {
          errors.push('Missing name: ' + folder.name);
          return;
        }
        if (!fm.description) {
          errors.push('Missing description: ' + folder.name);
          return;
        }

        allSkills.push({
          id: fm.name,
          desc: fm.description.slice(0, 120),
          path: 'skills/' + category + '/' + folder.name + '/SKILL.md',
          category: category
        });

        console.log('  ✓ ' + fm.name + ' (' + category + ')');
      } catch (err) {
        errors.push('Error parsing ' + folder.name + ': ' + err.message);
      }
    });
  });

  // Group by category
  const byCategory = {};
  allSkills.forEach(s => {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push({ id: s.id, desc: s.desc, path: s.path });
  });

  const index = {
    v: REGISTRY_VERSION,
    n: allSkills.length,
    skills: byCategory
  };

  const indexJson = formatIndexJson(index);
  fs.writeFileSync(INDEX_PATH, indexJson + '\n');

  const indexSize = fs.statSync(INDEX_PATH).size;
  console.log('');
  console.log('Generated: skills-index.json (' + (indexSize / 1024).toFixed(1) + 'KB)');
  console.log('Total: ' + allSkills.length + ' skills');
  Object.keys(byCategory).forEach(cat => {
    console.log('  ' + cat + ': ' + byCategory[cat].length);
  });

  if (errors.length > 0) {
    console.log('');
    console.log('Warnings (' + errors.length + '):');
    errors.forEach(e => console.log('  - ' + e));
  }
}

main();
