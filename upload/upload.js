const { finished } = require('stream/promises');
const path = require('path');


module.exports = {
    uploadImage: async (file, type) => {
        try {
            const { createReadStream, filename } = await file;
            const name = filename.split(".");
            const updatedName = name[name.length - 1];
            const newName = type + ('-' + Date.now() + '.' + updatedName).toString();
            const url = `assets/${type}/${newName}`;
            const stream = createReadStream();
            const out = require('fs').createWriteStream(path.join(__dirname, `../${url}`));
            stream.pipe(out);
            await finished(out);
            return url

        } catch {
            throw new Error('File error');
        }
    }
}