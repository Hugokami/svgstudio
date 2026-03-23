const fs = require('fs');

function cleanJournal() {
    let journal = fs.readFileSync('.jules/bolt.md', 'utf-8');

    // Check if there are multiple entries.
    const newEntryStr = `## 2026-03-23 - Unthrottled mouse/pointer operations`;

    if (journal.includes(newEntryStr)) {
        // Find the start of the new entry and trim it out.
        const index = journal.indexOf(newEntryStr);
        journal = journal.substring(0, index).trim();
        fs.writeFileSync('.jules/bolt.md', journal + '\n');
        console.log("Removed redundant entry from .jules/bolt.md");
    } else {
        // Maybe the date was different
        const lines = journal.split('\n');
        let newJournal = [];
        let inRedundantEntry = false;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('Unthrottled mouse/pointer operations')) {
                inRedundantEntry = true;
            }
            if (inRedundantEntry && lines[i].startsWith('## ') && !lines[i].includes('Unthrottled mouse/pointer operations')) {
                inRedundantEntry = false;
            }

            if (!inRedundantEntry) {
                newJournal.push(lines[i]);
            }
        }
        fs.writeFileSync('.jules/bolt.md', newJournal.join('\n') + '\n');
        console.log("Filtered redundant entries from .jules/bolt.md");
    }
}

cleanJournal();
