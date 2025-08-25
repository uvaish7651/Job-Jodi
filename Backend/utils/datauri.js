import DataUriParser from "datauri/parser.js";

import path from 'path';

const getDataUri = (file) => {
    const parser = new DataUriParser();

     
    if (!file || !file.originalname || !file.buffer) {
        console.log(" File not received correctly in getDataUri");
        return null; 
    }

    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;